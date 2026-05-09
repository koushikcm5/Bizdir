// src/components/common/Spinner.jsx
import React from 'react';
import { clsx } from 'clsx';

const Spinner = ({ size = 'md', className }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10', xl: 'w-16 h-16' };
  return (
    <div className={clsx(
      'rounded-full border-2 border-surface-200 border-t-primary-500 animate-spin',
      sizes[size], className
    )} />
  );
};

export default Spinner;
