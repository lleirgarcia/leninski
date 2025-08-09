import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Footer from './Footer';
import './Drawings.css';

const Drawings = () => {
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
    setZoomLevel((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
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

  return (
    <>
      <section className="drawings">
        <div className="container">
          <motion.div
            className="drawings-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Large image */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="/drawings/01.png"
                alt="Drawing 1"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/01.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/01.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Large image */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                src="/drawings/02%20.png"
                alt="Drawing 2"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/02%20.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/02%20.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Side by side */}
            <motion.div
              className="side-by-side-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="drawing-container-left">
                <img
                  src="/drawings/03%20.png"
                  alt="Drawing 3"
                  className="drawing-image clickable"
                  onClick={() => handleImageClick('/drawings/03%20.png')}
                  onError={(e) => {
                    console.error('Failed to load image /drawings/03%20.png');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="drawing-container-right">
                <img
                  src="/drawings/04.png"
                  alt="Drawing 4"
                  className="drawing-image clickable"
                  onClick={() => handleImageClick('/drawings/04.png')}
                  onError={(e) => {
                    console.error('Failed to load image /drawings/04.png');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>

            {/* Large image */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <img
                src="/drawings/05.png"
                alt="Drawing 5"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/05.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/05.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
            {/* 06 + 07 - Side by side */}
            <motion.div
              className="side-by-side-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="drawing-container-left">
                <img
                  src="/drawings/06.png"
                  alt="Drawing 6"
                  className="drawing-image clickable"
                  onClick={() => handleImageClick('/drawings/06.png')}
                  onError={(e) => {
                    console.error('Failed to load image /drawings/06.png');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="drawing-container-right">
                <img
                  src="/drawings/07.png"
                  alt="Drawing 7"
                  className="drawing-image clickable"
                  onClick={() => handleImageClick('/drawings/07.png')}
                  onError={(e) => {
                    console.error('Failed to load image /drawings/07.png');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>

            {/* 08 - Large */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <img
                src="/drawings/08.png"
                alt="Drawing 8"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/08.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/08.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          </motion.div>
        </div>

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
                alt="Zoomed Drawing"
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

export default Drawings;


