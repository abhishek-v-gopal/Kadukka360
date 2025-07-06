import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const variantMap = {
  primary: 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-800 text-white shadow-premium hover:shadow-medium',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-soft',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-soft',
  danger: 'bg-gradient-to-r from-error to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-premium hover:shadow-medium',
};

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-xl font-semibold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        transform hover:scale-105 active:scale-95
        ${variantMap[variant]}
        ${sizeMap[size]}
        ${className}
      `}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
};