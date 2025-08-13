import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = ({ 
  type = 'spinner', 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  if (type === 'shimmer') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="shimmer rounded-lg bg-gray-200 h-4 mb-2"></div>
        <div className="shimmer rounded-lg bg-gray-200 h-3 mb-1 w-3/4"></div>
        <div className="shimmer rounded-lg bg-gray-200 h-3 w-1/2"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <FaSpinner 
        className={`${sizeClasses[size]} animate-spin text-blue-500`} 
      />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

// Card skeleton loader for news articles
export const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="shimmer rounded-lg bg-gray-200 h-4 mb-3"></div>
          <div className="shimmer rounded-lg bg-gray-200 h-3 mb-2 w-3/4"></div>
          <div className="shimmer rounded-lg bg-gray-200 h-3 mb-4 w-1/2"></div>
          <div className="shimmer rounded-lg bg-gray-200 h-8 w-24"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader; 