import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-primary focus:border-primary 
            disabled:bg-gray-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-error focus:ring-error focus:border-error' : ''}
            ${className}
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};