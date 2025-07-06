import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
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
        <select
          {...props}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-primary focus:border-primary 
            disabled:bg-gray-50 disabled:cursor-not-allowed
            appearance-none bg-white pr-12 cursor-pointer
            transition-all duration-200
            ${error ? 'border-error focus:ring-error focus:border-error' : ''}
            ${className}
          `}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          size={20} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};