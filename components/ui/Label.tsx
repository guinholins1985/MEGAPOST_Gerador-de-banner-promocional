
import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-300 mb-2 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
