import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg ${className}`} {...props}>
      {children}
    </div>
  );
};
