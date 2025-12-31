import React, { useState, useEffect } from 'react';
import './ImageLoader.css';

// Global state to track image loading
let loadingImages = new Set();
let listeners = new Set();
let initialLoadComplete = false; // Track if initial load is done

const addLoadingImage = (id) => {
  loadingImages.add(id);
  notifyListeners();
};

const removeLoadingImage = (id) => {
  loadingImages.delete(id);
  notifyListeners();
};

const notifyListeners = () => {
  const isLoading = loadingImages.size > 0;
  // Mark as complete when all images are loaded for the first time
  if (!isLoading && !initialLoadComplete) {
    initialLoadComplete = true;
  }
  listeners.forEach(listener => listener(isLoading && !initialLoadComplete));
};

export const useImageLoader = () => {
  const [isLoading, setIsLoading] = useState(loadingImages.size > 0 && !initialLoadComplete);

  useEffect(() => {
    const listener = (loading) => setIsLoading(loading);
    listeners.add(listener);
    setIsLoading(loadingImages.size > 0 && !initialLoadComplete);
    
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return isLoading;
};

export const registerImageLoad = (id) => {
  addLoadingImage(id);
  return () => removeLoadingImage(id);
};

const ImageLoader = () => {
  const isLoading = useImageLoader();

  // Only show loader during initial load (when there are images loading)
  if (!isLoading) return null;

  return (
    <div className="image-loader-overlay">
      <div className="image-loader-container">
        <div className="image-loader-spinner"></div>
        <p className="image-loader-text">Loading images...</p>
      </div>
    </div>
  );
};

export default ImageLoader;

