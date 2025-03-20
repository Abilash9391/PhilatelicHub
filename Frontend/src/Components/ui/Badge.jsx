import React from 'react';

const Badge = ({ children, variant }) => {
  const variantClass = variant === 'secondary' ? 'bg-gray-200 text-gray-800' : 'bg-blue-200 text-blue-800';
  
  return (
    <span className={`p-5 inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${variantClass}`}>
      {children}
    </span>
  );
};

export default Badge;
