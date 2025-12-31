import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import OptimizedImage from './OptimizedImage';
import './PlanningSolution.css';

const PlanningSolution = () => {
  const [ref, inView] = useInView({
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
    // Force re-render
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(${newLevel}) translate(${position.x}px, ${position.y}px)`;
    }
  };

  const handleZoomOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Zoom Out clicked, current level:', zoomLevel);
    const newLevel = Math.max(zoomLevel - 0.5, 0.5);
    console.log('Setting zoom level to:', newLevel);
    setZoomLevel(newLevel);
    // Force re-render
    if (imageRef.current) {
      imageRef.current.style.transform = `scale(${newLevel}) translate(${position.x}px, ${position.y}px)`;
    }
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
    setZoomLevel(prev => Math.max(0.5, Math.min(5, prev + delta)));
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
      
      <section className="planning-solution">
        <div className="container">
          <motion.div 
            className="planning-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="planning-title">PLANNING SOLUTION</h1>
            <div className="about-text">
              Understanding space is the key to a successful project. A project begins its life at the planning stage. Everything matters here: from understanding the client's needs to ergonomics, and from ergonomics to presentation.
            </div>
          </motion.div>

          <motion.div 
            className="planning-content"
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* First Floor Plan Image - Large Horizontal */}
            <motion.div 
              className="floor-plan-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <OptimizedImage 
                src="/01.png" 
                alt="Architectural Floor Plan 1" 
                className="floor-plan-image clickable"
                onClick={() => handleImageClick('/01.png')}
                priority={true}
              />
            </motion.div>

            {/* Second Floor Plan Image - Large Horizontal */}
            <motion.div 
              className="floor-plan-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <OptimizedImage 
                src="/02.png" 
                alt="Architectural Floor Plan 2" 
                className="floor-plan-image clickable"
                onClick={() => handleImageClick('/02.png')}
              />
            </motion.div>

            {/* Third and Fourth Images - Side by Side */}
            <motion.div 
              className="side-by-side-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Third Floor Plan Image - Larger on Left */}
              <div className="floor-plan-container-left">
                <OptimizedImage 
                  src="/03.png" 
                  alt="Architectural Floor Plan 3" 
                  className="floor-plan-image clickable"
                  onClick={() => handleImageClick('/03.png')}
                />
              </div>

              {/* Fourth Floor Plan Image - Smaller on Right */}
              <div className="floor-plan-container-right">
                <OptimizedImage 
                  src="/04.png" 
                  alt="Architectural Floor Plan 4" 
                  className="floor-plan-image clickable"
                  onClick={() => handleImageClick('/04.png')}
                />
              </div>
            </motion.div>

            {/* Fifth Floor Plan Image - Large Horizontal */}
            <motion.div 
              className="floor-plan-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <OptimizedImage 
                src="/05.png" 
                alt="Architectural Floor Plan 5" 
                className="floor-plan-image clickable"
                onClick={() => handleImageClick('/05.png')}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Zoom Modal */}
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
                alt="Zoomed Floor Plan" 
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

export default PlanningSolution; 