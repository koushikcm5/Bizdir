// src/components/common/Input.jsx
import React from 'react';
import { clsx } from 'clsx';

const Input = React.forwardRef(({
  label, error, hint, icon: Icon, className, ...props
}, ref) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-surface-700 font-body">{label}</label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
          <Icon size={16} />
        </div>
      )}
      <input
        ref={ref}
        className={clsx(
          'w-full rounded-lg border bg-white px-3 py-2.5 text-sm font-body text-surface-800',
          'placeholder:text-surface-400 transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent',
          'disabled:bg-surface-50 disabled:cursor-not-allowed',
          Icon && 'pl-9',
          error ? 'border-red-400' : 'border-surface-200 hover:border-surface-300',
          className
        )}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 font-body">{error}</p>}
    {hint && !error && <p className="text-xs text-surface-400 font-body">{hint}</p>}
  </div>
));

Input.displayName = 'Input';
export default Input;
