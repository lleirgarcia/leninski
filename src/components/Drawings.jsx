import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import OptimizedImage from './OptimizedImage';
import './Drawings.css';

const Drawings = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Zoom In clicked, current level:', zoomLevel);
    const newLevel = Math.min(zoomLevel + 0.5, 5);
    console.log('Setting zoom level to:', newLevel);
    setZoomLevel(newLevel);
    // Force immediate DOM update
    setTimeout(() => {
      if (imageRef.current) {
        const transform = `scale(${newLevel}) translate(${position.x}px, ${position.y}px)`;
        imageRef.current.style.transform = transform;
        imageRef.current.style.setProperty('transform', transform, 'important');
        console.log('Applied transform to image:', transform);
        console.log('Image element:', imageRef.current);
        console.log('Computed style:', window.getComputedStyle(imageRef.current).transform);
      }
    }, 0);
  };

  const handleZoomOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Zoom Out clicked, current level:', zoomLevel);
    const newLevel = Math.max(zoomLevel - 0.5, 0.5);
    console.log('Setting zoom level to:', newLevel);
    setZoomLevel(newLevel);
    // Force immediate DOM update
    setTimeout(() => {
      if (imageRef.current) {
        const transform = `scale(${newLevel}) translate(${position.x}px, ${position.y}px)`;
        imageRef.current.style.transform = transform;
        imageRef.current.style.setProperty('transform', transform, 'important');
        console.log('Applied transform to image:', transform);
        console.log('Image element:', imageRef.current);
        console.log('Computed style:', window.getComputedStyle(imageRef.current).transform);
      }
    }, 0);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoomLevel((prev) => Math.max(0.5, Math.min(5, prev + delta)));
  };

  // Sync transform with zoomLevel and position
  useEffect(() => {
    if (imageRef.current && zoomedImage) {
      const transform = `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`;
      imageRef.current.style.setProperty('transform', transform, 'important');
      console.log('useEffect: Applied transform', transform, 'to image');
    }
  }, [zoomLevel, position, zoomedImage]);

  return (
    <>
      {/* Floating Home Button */}
      <Link to="/" className="floating-home-btn" aria-label="Back to Home">
        ⌂
      </Link>
      
      <section className="drawings">
        <div className="container">
          <motion.div
            className="drawings-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="drawings-title">DRAWINGS</h1>
            <div className="about-text">
              Technical and artistic drawings that define the essence of the project. Replace these images with your own content.
            </div>
          </motion.div>

          <motion.div
            className="drawings-content"
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            {/* Large image */}
            <div className="drawing-container">
              <OptimizedImage
                src="/drawings/01.png"
                alt="Drawing 1"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/01.png')}
                priority={true}
              />
            </div>

            {/* Large image */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <OptimizedImage
                src="/drawings/02%20.png"
                alt="Drawing 2"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/02%20.png')}
              />
            </motion.div>

            {/* Drawing 3 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <OptimizedImage
                src="/drawings/03%20.png"
                alt="Drawing 3"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/03%20.png')}
              />
            </motion.div>

            {/* Drawing 4 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <OptimizedImage
                src="/drawings/04.png"
                alt="Drawing 4"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/04.png')}
              />
            </motion.div>

            {/* Drawing 5 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <OptimizedImage
                src="/drawings/05.png"
                alt="Drawing 5"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/05.png')}
              />
            </motion.div>
            {/* Drawing 6 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <OptimizedImage
                src="/drawings/06.png"
                alt="Drawing 6"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/06.png')}
              />
            </motion.div>

            {/* 07 + 08 - Side by side */}
            <motion.div
              className="side-by-side-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="drawing-container-left">
                <OptimizedImage
                  src="/drawings/07.png"
                  alt="Drawing 7"
                  className="drawing-image clickable"
                  onClick={() => handleImageClick('/drawings/07.png')}
                />
              </div>
              <div className="drawing-container-right">
                <OptimizedImage
                  src="/drawings/08.png"
                  alt="Drawing 8"
                  className="drawing-image clickable"
                  onClick={() => handleImageClick('/drawings/08.png')}
                />
              </div>
            </motion.div>

            {/* Drawing 9 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <OptimizedImage
                src="/drawings/09.png"
                alt="Drawing 9"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/09.png')}
              />
            </motion.div>

            {/* Drawing 10 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <OptimizedImage
                src="/drawings/10.png"
                alt="Drawing 10"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/10.png')}
              />
            </motion.div>

            {/* Drawing 11 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <OptimizedImage
                src="/drawings/11.png"
                alt="Drawing 11"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/11.png')}
              />
            </motion.div>

            {/* Drawing 12 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              <OptimizedImage
                src="/drawings/12.png"
                alt="Drawing 12"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/12.png')}
              />
            </motion.div>

            {/* Drawing 13 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <OptimizedImage
                src="/drawings/13.png"
                alt="Drawing 13"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/13.png')}
              />
            </motion.div>

            {/* Drawing 14 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9 }}
            >
              <OptimizedImage
                src="/drawings/14.png"
                alt="Drawing 14"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/14.png')}
              />
            </motion.div>

            {/* Drawing 15 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <OptimizedImage
                src="/drawings/15.png"
                alt="Drawing 15"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/15.png')}
              />
            </motion.div>

            {/* Drawing 16 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
            >
              <OptimizedImage
                src="/drawings/16.png"
                alt="Drawing 16"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/16.png')}
              />
            </motion.div>
          </motion.div>
        </div>

        {zoomedImage && (
          <>
            <div className="zoom-modal" onClick={closeZoom}>
              <div
                className="zoom-content"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  ref={imageRef}
                  src={zoomedImage}
                  alt="Zoomed Drawing"
                  className="zoomed-image"
                  draggable={false}
                  style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    willChange: 'transform'
                  }}
                />
              </div>
            </div>
            <div className="zoom-controls" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10000 }}>
              <button 
                type="button" 
                onClick={(e) => { 
                  console.log('Zoom In button clicked');
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  handleZoomIn(e); 
                }} 
                onMouseDown={(e) => { 
                  console.log('Zoom In mouse down');
                  e.preventDefault(); 
                  e.stopPropagation(); 
                }}
                className="zoom-btn"
              >
                +
              </button>
              <button 
                type="button" 
                onClick={(e) => { 
                  console.log('Zoom Out button clicked');
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  handleZoomOut(e); 
                }} 
                onMouseDown={(e) => { 
                  console.log('Zoom Out mouse down');
                  e.preventDefault(); 
                  e.stopPropagation(); 
                }}
                className="zoom-btn"
              >
                -
              </button>
              <button 
                type="button" 
                onClick={(e) => { 
                  console.log('Close button clicked');
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  closeZoom(); 
                }} 
                onMouseDown={(e) => { 
                  console.log('Close mouse down');
                  e.preventDefault(); 
                  e.stopPropagation(); 
                }}
                className="zoom-btn close"
              >
                ×
              </button>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Drawings;


