import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <div className={`
      bg-white rounded-2xl shadow-soft border border-gray-100
      ${hover ? 'hover:shadow-medium transition-all duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};