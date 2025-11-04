
import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <select
      className={`block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
