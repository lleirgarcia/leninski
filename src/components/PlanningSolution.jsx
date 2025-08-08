import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Footer from './Footer';
import './PlanningSolution.css';

const PlanningSolution = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
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

  return (
    <>
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
              <img 
                src="./01.png" 
                alt="Architectural Floor Plan 1" 
                className="floor-plan-image clickable"
                onClick={() => handleImageClick('./01.png')}
                onError={(e) => {
                  console.error('Failed to load image 01.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Second Floor Plan Image - Large Horizontal */}
            <motion.div 
              className="floor-plan-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img 
                src="./02.png" 
                alt="Architectural Floor Plan 2" 
                className="floor-plan-image clickable"
                onClick={() => handleImageClick('./02.png')}
                onError={(e) => {
                  console.error('Failed to load image 02.png');
                  e.target.style.display = 'none';
                }}
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
                <img 
                  src="./03.png" 
                  alt="Architectural Floor Plan 3" 
                  className="floor-plan-image clickable"
                  onClick={() => handleImageClick('./03.png')}
                  onError={(e) => {
                    console.error('Failed to load image 03.png');
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Fourth Floor Plan Image - Smaller on Right */}
              <div className="floor-plan-container-right">
                <img 
                  src="./04.png" 
                  alt="Architectural Floor Plan 4" 
                  className="floor-plan-image clickable"
                  onClick={() => handleImageClick('./04.png')}
                  onError={(e) => {
                    console.error('Failed to load image 04.png');
                    e.target.style.display = 'none';
                  }}
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
              <img 
                src="./05.png" 
                alt="Architectural Floor Plan 5" 
                className="floor-plan-image clickable"
                onClick={() => handleImageClick('./05.png')}
                onError={(e) => {
                  console.error('Failed to load image 05.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Zoom Modal */}
        {zoomedImage && (
          <div className="zoom-modal" onClick={closeZoom}>
            <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
              <button onClick={handleZoomIn} className="zoom-btn">+</button>
              <button onClick={handleZoomOut} className="zoom-btn">-</button>
              <button onClick={closeZoom} className="zoom-btn close">×</button>
            </div>
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
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
              />
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default PlanningSolution; 