// src/components/common/Select.jsx
import React from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({
  label, error, options = [], placeholder = 'Select...', className, ...props
}, ref) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-surface-700 font-body">{label}</label>}
    <div className="relative">
      <select
        ref={ref}
        className={clsx(
          'w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-9 text-sm font-body text-surface-800',
          'transition-all duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent',
          'disabled:bg-surface-50 disabled:cursor-not-allowed',
          error ? 'border-red-400' : 'border-surface-200 hover:border-surface-300',
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" />
    </div>
    {error && <p className="text-xs text-red-500 font-body">{error}</p>}
  </div>
));

Select.displayName = 'Select';
export default Select;
