import React from 'react';
import { LucideIcon } from 'lucide-react';
import classNames from 'classnames';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  icon: Icon,
  children,
  className,
}) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        baseStyles,
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-disabled={disabled}
    >
      {Icon && <Icon className="inline-block mr-2" />}
      {children}
    </button>
  );
};

export default Button;