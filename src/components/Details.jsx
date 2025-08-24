import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './Details.css';

const Details = () => {
  const { ref, inView } = useInView({
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
      {/* Floating Home Button */}
      <Link to="/" className="floating-home-btn" aria-label="Back to Home">
        ⌂
      </Link>
      
      <section className="details">
        <div className="container">
          <motion.div
            className="details-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="details-title">DETAILS</h1>
            <div className="about-text">
              Detailed views and specifications that showcase the precision and attention to detail in every aspect of the project.
            </div>
          </motion.div>

          <motion.div
            className="details-content"
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Detail 1 */}
            <motion.div
              className="detail-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="/details/01.png"
                alt="Detail 1"
                className="detail-image clickable"
                onClick={() => handleImageClick('/details/01.png')}
                onError={(e) => {
                  console.error('Failed to load image /details/01.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Detail 2 */}
            <motion.div
              className="detail-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                src="/details/02.png"
                alt="Detail 2"
                className="detail-image clickable"
                onClick={() => handleImageClick('/details/02.png')}
                onError={(e) => {
                  console.error('Failed to load image /details/02.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Detail 3 */}
            <motion.div
              className="detail-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <img
                src="/details/03.png"
                alt="Detail 3"
                className="detail-image clickable"
                onClick={() => handleImageClick('/details/03.png')}
                onError={(e) => {
                  console.error('Failed to load image /details/03.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Detail 4 */}
            <motion.div
              className="detail-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <img
                src="/details/04.png"
                alt="Detail 4"
                className="detail-image clickable"
                onClick={() => handleImageClick('/details/04.png')}
                onError={(e) => {
                  console.error('Failed to load image /details/04.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Detail 5 */}
            <motion.div
              className="detail-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <img
                src="/details/05.png"
                alt="Detail 5"
                className="detail-image clickable"
                onClick={() => handleImageClick('/details/05.png')}
                onError={(e) => {
                  console.error('Failed to load image /details/05.png');
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
                alt="Zoomed Detail"
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

export default Details;
