import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, icon: Icon, error, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        )}
        <input
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-red-500' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${label}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;