import React from 'react'

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'blue', 
  text = null,
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  }

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600',
    white: 'border-white'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-solid border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  )
}

// Page loader for full screen loading
export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="large" text={text} />
  </div>
)

// Button loader for inline loading
export const ButtonLoader = ({ size = 'small', color = 'white' }) => (
  <LoadingSpinner size={size} color={color} />
)

export default LoadingSpinner