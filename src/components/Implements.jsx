import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './Implements.css';

const Implements = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  // Images organized by projects
  const projectSections = [
    {
      title: 'IN PROCESS',
      images: [
        { src: '/IMPLEMENT/IN PROCESS/01.png', alt: 'Implementation 1', size: 'hero', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/IN PROCESS/02.png', alt: 'Implementation 2', size: 'large', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/IN PROCESS/03.png', alt: 'Implementation 3', size: 'medium', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/IN PROCESS/04.png', alt: 'Implementation 4', size: 'wide', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/IN PROCESS/05.png', alt: 'Implementation 5', size: 'small', removeWhite: 'strong-remove-white' }
      ]
    },
    {
      title: 'IZAKAYA',
      images: [
        { src: '/IMPLEMENT/IZAKAYA/01.jpg', alt: 'Izakaya 1', size: 'featured', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/2.jpg', alt: 'Izakaya 2', size: 'tall', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/3.jpg', alt: 'Izakaya 3', size: 'square', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/4.jpg', alt: 'Izakaya 4', size: 'medium', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/5.jpg', alt: 'Izakaya 5', size: 'large', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/6.jpg', alt: 'Izakaya 6', size: 'small', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/7.jpg', alt: 'Izakaya 7', size: 'panoramic', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/8.jpg', alt: 'Izakaya 8', size: 'medium', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/9.jpg', alt: 'Izakaya 9', size: 'small', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/10.jpg', alt: 'Izakaya 10', size: 'wide', removeWhite: '' }
      ]
    },
    {
      title: 'ZELINSKIY',
      images: [
        { src: '/IMPLEMENT/ZELINSKIY/01.png', alt: 'Zelinskiy 1', size: 'hero', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/ZELINSKIY/3.png', alt: 'Zelinskiy 3', size: 'large', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/ZELINSKIY/4.png', alt: 'Zelinskiy 4', size: 'tall', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/ZELINSKIY/5.png', alt: 'Zelinskiy 5', size: 'square', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/ZELINSKIY/6.png', alt: 'Zelinskiy 6', size: 'wide', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/ZELINSKIY/7.png', alt: 'Zelinskiy 7', size: 'medium', removeWhite: 'strong-remove-white' }
      ]
    },
    {
      title: 'BLOGERS',
      images: [
        { src: '/IMPLEMENT/blogers/01.png', alt: 'Blogers 1', size: 'featured', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/blogers/02.jpg', alt: 'Blogers 2', size: 'large', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/03.jpg', alt: 'Blogers 3', size: 'tall', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/05.jpg', alt: 'Blogers 5', size: 'medium', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/06.jpg', alt: 'Blogers 6', size: 'square', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/07.jpg', alt: 'Blogers 7', size: 'small', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/08.jpg', alt: 'Blogers 8', size: 'wide', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/09.jpg', alt: 'Blogers 9', size: 'medium', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/10.jpg', alt: 'Blogers 10', size: 'small', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/Screenshot_1.jpg', alt: 'Blogers Screenshot', size: 'panoramic', removeWhite: '' }
      ]
    }
  ];

  return (
    <div className="implements-container">
      {/* Floating Home Button */}
      <Link to="/" className="floating-home-btn">⌂</Link>
      
      <div className="implements-content">
        <motion.h1
          className="implements-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          IMPLEMENTS
        </motion.h1>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Project Sections */}
          {projectSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              className="project-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4 + (sectionIndex * 0.2)
              }}
            >
              {/* Project Title */}
              <motion.h2
                className="project-title"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + (sectionIndex * 0.2)
                }}
              >
                {section.title}
              </motion.h2>

              {/* Gallery Table for this section */}
              <div className={`gallery-table ${section.title === 'IN PROCESS' ? 'linear-grid' : ''} ${section.title === 'IZAKAYA' ? 'mosaic-grid' : ''}`}>
                {section.images.map((image, imageIndex) => {
                  const dimensionKey = `${section.title}-${imageIndex}`;
                  const dimensions = imageDimensions[dimensionKey];
                  
                  // Calculate grid spans based on actual image dimensions for IZAKAYA
                  let gridStyle = {};
                  if (section.title === 'IZAKAYA') {
                    if (dimensions && dimensions.columnSpan && dimensions.rowSpan) {
                      // Use calculated spans from loaded image
                      gridStyle = {
                        gridColumn: `span ${dimensions.columnSpan}`,
                        gridRow: `span ${dimensions.rowSpan}`
                      };
                    } else {
                      // Default spans while image loads
                      gridStyle = {
                        gridColumn: 'span 2',
                        gridRow: 'span 10'
                      };
                    }
                  }
                  
                  return (
                    <motion.div
                      key={`${sectionIndex}-${imageIndex}`}
                      className={`gallery-item ${image.size}`}
                      style={gridStyle}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.6 + (sectionIndex * 0.2) + (imageIndex * 0.05)
                      }}
                      onClick={() => handleImageClick(image.src)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`gallery-image ${image.removeWhite}`}
                        onError={(e) => e.target.style.display = 'none'}
                        onLoad={(e) => {
                          if (section.title === 'IZAKAYA' && !imageDimensions[dimensionKey]) {
                            const img = e.target;
                            const key = dimensionKey;
                            const aspectRatio = img.naturalWidth / img.naturalHeight;
                            
                            // Calculate spans based on aspect ratio for precise fitting without gaps
                            // Use window width or default to max-width
                            const containerWidth = Math.min(window.innerWidth - 80, 1400); // Account for padding
                            
                            // Grid configuration - 8 columns on desktop
                            const gridColumns = window.innerWidth > 1200 ? 8 : (window.innerWidth > 768 ? 6 : 4);
                            const rowHeight = 5; // Match grid-auto-rows
                            const columnWidth = containerWidth / gridColumns;
                            
                            // Target size for images to fill space efficiently
                            const targetArea = 120000; // Target area in pixels^2
                            const targetWidth = Math.sqrt(targetArea * aspectRatio);
                            const targetHeight = targetWidth / aspectRatio;
                            
                            // Calculate optimal column span and row span
                            let columnSpan = Math.round(targetWidth / columnWidth);
                            columnSpan = Math.max(1, Math.min(columnSpan, gridColumns));
                            
                            // Calculate row span to maintain aspect ratio exactly
                            const imageWidth = columnWidth * columnSpan;
                            const imageHeight = imageWidth / aspectRatio;
                            let rowSpan = Math.round(imageHeight / rowHeight);
                            
                            // Ensure minimum sizes and adjust to avoid gaps
                            columnSpan = Math.max(1, Math.min(columnSpan, gridColumns));
                            rowSpan = Math.max(10, rowSpan);
                            
                            // Fine-tune to ensure images fit well together
                            // Round to nearest values that work well with the grid
                            if (aspectRatio > 2) {
                              columnSpan = Math.min(6, columnSpan);
                            } else if (aspectRatio > 1.5) {
                              columnSpan = Math.min(4, columnSpan);
                            } else if (aspectRatio > 1) {
                              columnSpan = Math.min(3, columnSpan);
                            } else {
                              columnSpan = Math.min(2, columnSpan);
                            }
                            
                            setImageDimensions(prev => ({
                              ...prev,
                              [key]: {
                                width: img.naturalWidth,
                                height: img.naturalHeight,
                                aspectRatio: aspectRatio,
                                columnSpan: columnSpan,
                                rowSpan: rowSpan
                              }
                            }));
                          }
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Section Separator (except for last section) */}
              {sectionIndex < projectSections.length - 1 && (
                <div className="section-separator"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <motion.div
          className="zoom-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeZoom}
        >
          <div className="zoom-controls">
            <button className="zoom-btn" onClick={closeZoom}>
              ×
            </button>
          </div>
          <motion.img
            src={zoomedImage}
            alt="Zoomed implementation"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Implements;