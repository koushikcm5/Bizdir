// src/utils/lazyRetry.js
import { lazy } from 'react';

/**
 * A wrapper for React.lazy that handles ChunkLoadErrors (caused by new deployments).
 * If a chunk fails to load, it forces a page refresh to get the latest assets.
 */
export const lazyRetry = (componentImport) => {
  return lazy(async () => {
    const pageHasAlreadyForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyForceRefreshed) {
        // Clear caches and force reload
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }

      // If we already refreshed and it still fails, it's a real error
      throw error;
    }
  });
};
