import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  onClick,
  priority = false,
  style = {},
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle image load - completely passive
  const handleLoad = () => {
    // Use multiple layers of async to ensure it never blocks
    if ('scheduler' in window && 'postTask' in window.scheduler) {
      window.scheduler.postTask(() => {
        setIsLoaded(true);
      }, { priority: 'background' });
    } else if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setIsLoaded(true);
      }, { timeout: 200 });
    } else {
      // Use setTimeout with longer delay to batch updates
      setTimeout(() => {
        setIsLoaded(true);
      }, 16); // ~1 frame
    }
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy" // Use lazy but load all at once via src
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.2,
        transition: isLoaded ? 'opacity 0.3s ease-out' : 'none',
        backgroundColor: isLoaded ? 'transparent' : '#f5f5f5',
        willChange: isLoaded ? 'auto' : 'opacity'
      }}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;

