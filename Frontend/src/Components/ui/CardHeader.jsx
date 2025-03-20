import React from 'react';

const CardHeader = ({ children }) => {
  return (
    <div className="border-b p-4">
      {children}
    </div>
  );
};

export default CardHeader;
