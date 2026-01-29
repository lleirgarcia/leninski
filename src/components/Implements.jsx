import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import SEO from './SEO';
import './Implements.css';

const Implements = () => {
  const [zoomedImage, setZoomedImage] = useState(null);

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);

  useEffect(() => {
    // Solo hacer scroll to top en desktop, en móvil permitir scroll libre
    if (!isMobile) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    // Asegurar que el body pueda hacer scroll inmediatamente en móvil
    if (isMobile) {
      // Forzar que el body y html puedan hacer scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
      document.body.style.position = 'relative';
      document.documentElement.style.position = 'relative';
      
      // Asegurar que el contenedor no bloquee el scroll
      const container = document.querySelector('.implements-container');
      if (container) {
        container.style.overflow = '';
        container.style.height = 'auto';
      }
    }
  }, [isMobile]);

  const handleImageClick = (imageSrc) => {
    // No abrir imágenes en móviles
    if (isMobile) {
      return;
    }
    
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
        { src: '/IMPLEMENT/blogers/001.png', alt: 'Blogers 1', size: 'featured', removeWhite: '' },
        { src: '/IMPLEMENT/blogers/002.png', alt: 'Blogers 2', size: 'large', removeWhite: '' }
      ]
    },
    {
      title: 'ZIELINSKI & ROZEN, KYIV',
      images: [
        { src: '/IMPLEMENT/ZELINSKIY/001.png', alt: 'Zelinskiy 1', size: 'large', removeWhite: '' }
      ]
    },
    {
      title: 'IN PROCESS. APARTMENT AT "ONE PALM" DUBAI',
      images: [
        { src: '/IMPLEMENT/IN PROCESS/1 (1).png', alt: 'Implementation 1', size: 'large', removeWhite: '' },
        { src: '/IMPLEMENT/IN PROCESS/2 (1).png', alt: 'Implementation 2', size: 'medium', removeWhite: '' },
        { src: '/IMPLEMENT/IN PROCESS/3 (1).png', alt: 'Implementation 3', size: 'medium', removeWhite: '' },
        { src: '/IMPLEMENT/IN PROCESS/4.png', alt: 'Implementation 4', size: 'wide', removeWhite: '' }
      ]
    }
  ];

  return (
    <div className="implements-container">
      <SEO
        title="Implemented Projects – LENA ROH"
        description="Implemented interior work by LENA ROH—realized spaces and delivered outcomes, available for opportunities in Switzerland, the UK and Denmark."
      />
      {/* Floating Home Button */}
      <Link to="/" className="floating-home-btn" aria-label="Back to Home">⌂</Link>
      
      <section className="implements">
        <div className="container">
          <div className="implements-header">
            <h1 className="implements-title">
              IMPLEMENTS
            </h1>
            <div className="about-text">
              Project implementation is a way to keep an idea alive.
              My involvement does not end
              with drawings—it continues into the implementation phase. This is a complex and fascinating process where ideas become reality.
            </div>
          </div>

          <div className="implements-content">
          {/* Project Sections */}
          {projectSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="project-section"
            >
              {/* Project Title */}
              <h2 className="project-title">
                {section.title}
              </h2>

              {/* Gallery Table for this section */}
              <div className="gallery-table">
                {section.images.map((image, imageIndex) => (
                  <div
                    key={`${sectionIndex}-${imageIndex}`}
                    className={`gallery-item ${image.size} ${section.title === 'BLOGERS' && imageIndex === 1 ? 'blogers-second-image' : ''} ${section.title === 'IZAKAYA' && imageIndex === 1 ? 'izakaya-second-image' : ''} ${imageIndex > 0 ? 'image-with-top-margin' : ''}`}
                    {...(!isMobile && {
                      onClick: () => handleImageClick(image.src)
                    })}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`gallery-image ${image.removeWhite}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        console.error('Error loading image:', image.src);
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        console.log('Image loaded:', image.src);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Section Separator (except for last section) */}
              {sectionIndex < projectSections.length - 1 && (
                <div className="section-separator"></div>
              )}
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {zoomedImage && (
        <motion.div
          className="zoom-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeZoom}
        >
          <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-btn" onClick={closeZoom}>
              ×
            </button>
          </div>
          <motion.div
            className="zoom-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomedImage}
              alt="Zoomed implementation"
              className="zoomed-image-original"
              key={zoomedImage}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Implements;