import React from 'react';

const CardFooter = ({ children }) => {
  return (
    <div className="flex justify-between p-4 border-t">
      {children}
    </div>
  );
};

export default CardFooter;
