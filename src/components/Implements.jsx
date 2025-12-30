import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './Implements.css';

const Implements = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
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
      title: 'VIRGIN IZAKAYA BAR DUBAI',
      images: [
        { src: '/IMPLEMENT/IZAKAYA/001.png', alt: 'Izakaya 1', size: 'featured', removeWhite: '' },
        { src: '/IMPLEMENT/IZAKAYA/002.png', alt: 'Izakaya 2', size: 'tall', removeWhite: '' }
      ]
    },
    {
      title: 'BLOGER´S HOUSE',
      images: [
        { src: '/IMPLEMENT/blogers/001.png', alt: 'Blogers 1', size: 'featured', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/blogers/002.png', alt: 'Blogers 2', size: 'large', removeWhite: 'strong-remove-white' }
      ]
    },
    {
      title: 'ZIELINSKI & ROZEN, KYIV',
      images: [
        { src: '/IMPLEMENT/ZELINSKIY/001.png', alt: 'Zelinskiy 1', size: 'large', removeWhite: 'strong-remove-white' }
      ]
    },
    {
      title: 'IN PROCESS. APARTMENT AT "ONE PALM" DUBAI',
      images: [
        { src: '/IMPLEMENT/IN PROCESS/1 (1).png', alt: 'Implementation 1', size: 'large', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/IN PROCESS/2 (1).png', alt: 'Implementation 2', size: 'medium', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/IN PROCESS/3 (1).png', alt: 'Implementation 3', size: 'medium', removeWhite: 'strong-remove-white' },
        { src: '/IMPLEMENT/IN PROCESS/4.png', alt: 'Implementation 4', size: 'wide', removeWhite: 'strong-remove-white' }
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
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + (sectionIndex * 0.2)
                }}
              >
                {section.title}
              </motion.h2>

              {/* Gallery Table for this section */}
              <div className="gallery-table">
                {section.images.map((image, imageIndex) => (
                  <motion.div
                    key={`${sectionIndex}-${imageIndex}`}
                    className={`gallery-item ${image.size} ${section.title === 'BLOGERS' && imageIndex === 1 ? 'blogers-second-image' : ''} ${section.title === 'IZAKAYA' && imageIndex === 1 ? 'izakaya-second-image' : ''} ${imageIndex > 0 ? 'image-with-top-margin' : ''}`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
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
                      onError={(e) => {
                        console.error('Error loading image:', image.src);
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        console.log('Image loaded:', image.src);
                      }}
                    />
                  </motion.div>
                ))}
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