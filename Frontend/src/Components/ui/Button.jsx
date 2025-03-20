import React from 'react';

const Button = ({ children, type = "button", disabled, className, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
