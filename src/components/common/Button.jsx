// src/components/common/Button.jsx
import React from 'react';
import { clsx } from 'clsx';
import Spinner from './Spinner';

const Button = ({
  children, variant = 'primary', size = 'md',
  loading, disabled, className, icon: Icon, ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400 shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary: 'bg-surface-100 text-surface-800 hover:bg-surface-200 focus:ring-surface-300',
    outline: 'border border-surface-300 text-surface-700 hover:bg-surface-50 focus:ring-surface-300',
    ghost: 'text-surface-600 hover:bg-surface-100 focus:ring-surface-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-base',
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size="sm" className="border-t-white border-white/30" /> : Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;
