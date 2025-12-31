import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Footer from './Footer';
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
  const [zoomLevel, setZoomLevel] = useState(2); // Zoom inicial: 2x (zoom +1)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialScale, setInitialScale] = useState(0); // Se calculará cuando la imagen cargue
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader
  
  // 2 niveles de zoom fijos: 2x, 3x
  const zoomLevels = [2, 3];
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
    setZoomLevel(2); // Abrir en zoom 2x (zoom +1) por defecto
    setPosition({ x: 0, y: 0 });
    setInitialScale(0); // Reset initial scale to 0, will be calculated on load
    setIsLoading(true); // Activar loader
    
    // Desactivar loader después de 0.8 segundos
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setZoomLevel(2); // Reset a zoom 2x para la próxima vez que se abra
    setPosition({ x: 0, y: 0 });
    setIsLoading(false); // Desactivar loader al cerrar
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setZoomLevel((prev) => {
      // Encuentra el índice actual en zoomLevels
      let currentIndex = zoomLevels.findIndex(level => Math.abs(level - prev) < 0.1);
      
      // Si no encuentra el índice exacto, busca el más cercano
      if (currentIndex === -1) {
        currentIndex = zoomLevels.reduce((closest, level, index) => {
          return Math.abs(level - prev) < Math.abs(zoomLevels[closest] - prev) ? index : closest;
        }, 0);
      }
      
      // Si no está en el último nivel, aumenta
      if (currentIndex < zoomLevels.length - 1) {
        return zoomLevels[currentIndex + 1];
      }
      // Si ya está en el último nivel, mantén el nivel actual
      return zoomLevels[currentIndex];
    });
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setZoomLevel((prev) => {
      // Encuentra el índice actual en zoomLevels
      let currentIndex = zoomLevels.findIndex(level => Math.abs(level - prev) < 0.1);
      
      // Si no encuentra el índice exacto, busca el más cercano
      if (currentIndex === -1) {
        currentIndex = zoomLevels.reduce((closest, level, index) => {
          return Math.abs(level - prev) < Math.abs(zoomLevels[closest] - prev) ? index : closest;
        }, 0);
      }
      
      // Si no está en el primer nivel, disminuye
      if (currentIndex > 0) {
        return zoomLevels[currentIndex - 1];
      }
      // Si ya está en el primer nivel, mantén el nivel actual
      return zoomLevels[currentIndex];
    });
  };


  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    // Guardar la posición del cursor y la posición actual de la imagen
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        // Calcular el delta del movimiento y aplicar el factor de sensibilidad
        const dragSensitivity = 2.0; // Factor de sensibilidad (mayor = más recorrido)
        const deltaX = (e.clientX - dragStart.x) * dragSensitivity;
        const deltaY = (e.clientY - dragStart.y) * dragSensitivity;
        setPosition({
          x: position.x + deltaX,
          y: position.y + deltaY
        });
        // Actualizar dragStart para el próximo movimiento
        setDragStart({
          x: e.clientX,
          y: e.clientY
        });
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse move and up listeners for smoother dragging
  useEffect(() => {
    if (isDragging) {
      const dragSensitivity = 2.0; // Factor de sensibilidad (mayor = más recorrido)
      let lastMouseX = dragStart.x;
      let lastMouseY = dragStart.y;
      
      const handleGlobalMouseMove = (e) => {
        e.preventDefault();
        requestAnimationFrame(() => {
          // Calcular el delta del movimiento y aplicar el factor de sensibilidad
          const deltaX = (e.clientX - lastMouseX) * dragSensitivity;
          const deltaY = (e.clientY - lastMouseY) * dragSensitivity;
          
          setPosition((prevPosition) => ({
            x: prevPosition.x + deltaX,
            y: prevPosition.y + deltaY
          }));
          
          // Actualizar lastMouse para el próximo movimiento
          lastMouseX = e.clientX;
          lastMouseY = e.clientY;
        });
      };

      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };

      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      window.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart.x, dragStart.y]);

  // Calcular scale inicial para que la imagen se vea completa
  useEffect(() => {
    if (zoomedImage && imageRef.current) {
      const img = imageRef.current;
      
      // Ocultar la imagen inmediatamente para evitar efectos visuales extraños
      img.style.opacity = '0';
      
      const calculateScale = () => {
        if (img.complete && img.naturalWidth && img.naturalHeight) {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const imgAspectRatio = img.naturalWidth / img.naturalHeight;
          const viewportAspectRatio = viewportWidth / viewportHeight;
          
          let scale;
          if (imgAspectRatio > viewportAspectRatio) {
            // Imagen más ancha - ajustar al ancho del viewport
            scale = (viewportWidth * 0.9) / img.naturalWidth;
          } else {
            // Imagen más alta - ajustar al alto del viewport
            scale = (viewportHeight * 0.9) / img.naturalHeight;
          }
          
          setInitialScale(scale);
        }
      };
      
      if (img.complete && img.naturalWidth && img.naturalHeight) {
        calculateScale();
      } else {
        img.onload = calculateScale;
      }
    }
  }, [zoomedImage]);

  // Aplicar transform cuando cambia zoomLevel o position (solo si initialScale ya está calculado)
  useEffect(() => {
    if (zoomedImage && imageRef.current && initialScale > 0) {
      const img = imageRef.current;
      if (img.complete && img.naturalWidth && img.naturalHeight) {
        // Aplicar estilos de tamaño una sola vez
        img.style.width = `${img.naturalWidth}px`;
        img.style.height = `${img.naturalHeight}px`;
        img.style.maxWidth = 'none';
        img.style.maxHeight = 'none';
        img.style.display = 'block';
        
        // Calcular el scale total: initialScale * zoomLevel
        const totalScale = initialScale * zoomLevel;
        const transform = `scale(${totalScale}) translate(${position.x}px, ${position.y}px)`;
        img.style.setProperty('transform', transform, 'important');
        
        // Mostrar la imagen solo cuando todo esté listo
        requestAnimationFrame(() => {
          img.style.opacity = '1';
        });
      }
    }
  }, [zoomLevel, position, zoomedImage, initialScale]);

  // Agregar event listener no-pasivo para wheel
  useEffect(() => {
    if (zoomedImage) {
      const zoomContent = document.querySelector('.zoom-content');
      if (zoomContent) {
        const wheelHandler = (e) => {
          e.preventDefault();
          const delta = e.deltaY > 0 ? -1 : 1;
          setZoomLevel((prev) => {
            let currentIndex = zoomLevels.findIndex(level => Math.abs(level - prev) < 0.1);
            if (currentIndex === -1) {
              currentIndex = zoomLevels.reduce((closest, level, index) => {
                return Math.abs(level - prev) < Math.abs(zoomLevels[closest] - prev) ? index : closest;
              }, 0);
            }
            // Permitir zoom in y zoom out
            if (delta > 0 && currentIndex < zoomLevels.length - 1) {
              return zoomLevels[currentIndex + 1]; // Zoom in
            } else if (delta < 0 && currentIndex > 0) {
              return zoomLevels[currentIndex - 1]; // Zoom out
            }
            return zoomLevels[currentIndex];
          });
        };
        zoomContent.addEventListener('wheel', wheelHandler, { passive: false });
        return () => {
          zoomContent.removeEventListener('wheel', wheelHandler);
        };
      }
    }
  }, [zoomedImage, zoomLevels]);



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
            </div>

            {/* Large image */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

            {/* Drawing 3 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
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
            </motion.div>

            {/* Drawing 4 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
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
            </motion.div>

            {/* Drawing 5 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
            {/* Drawing 6 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
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
            </motion.div>

            {/* 07 + 08 - Side by side */}
            <motion.div
              className="side-by-side-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="drawing-container-left">
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
              <div className="drawing-container-right">
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
              </div>
            </motion.div>

            {/* Drawing 9 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <img
                src="/drawings/09.png"
                alt="Drawing 9"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/09.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/09.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Drawing 10 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <img
                src="/drawings/10.png"
                alt="Drawing 10"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/10.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/10.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Drawing 11 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <img
                src="/drawings/11.png"
                alt="Drawing 11"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/11.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/11.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Drawing 12 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              <img
                src="/drawings/12.png"
                alt="Drawing 12"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/12.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/12.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Drawing 13 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <img
                src="/drawings/13.png"
                alt="Drawing 13"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/13.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/13.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Drawing 14 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9 }}
            >
              <img
                src="/drawings/14.png"
                alt="Drawing 14"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/14.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/14.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Drawing 15 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <img
                src="/drawings/15.png"
                alt="Drawing 15"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/15.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/15.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Drawing 16 */}
            <motion.div
              className="drawing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
            >
              <img
                src="/drawings/16.png"
                alt="Drawing 16"
                className="drawing-image clickable"
                onClick={() => handleImageClick('/drawings/16.png')}
                onError={(e) => {
                  console.error('Failed to load image /drawings/16.png');
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {zoomedImage && (
          <div className="zoom-modal" onClick={closeZoom}>
            {isLoading && (
              <div className="zoom-loader" onClick={(e) => e.stopPropagation()}>
                <div className="loader-spinner"></div>
              </div>
            )}
            <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={handleZoomIn} className="zoom-btn">+</button>
              {zoomLevel === 3 && (
                <button type="button" onClick={handleZoomOut} className="zoom-btn">-</button>
              )}
              <button type="button" onClick={closeZoom} className="zoom-btn close">×</button>
            </div>
            <div
              className="zoom-content"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                ref={imageRef}
                src={zoomedImage}
                alt="Zoomed Drawing"
                className="zoomed-image"
                draggable={false}
                loading="eager"
                decoding="async"
                onLoad={(e) => {
                  // El cálculo del scale se hace en el useEffect, solo asegurar que la imagen esté lista
                  const img = e.target;
                  // La imagen se mostrará cuando initialScale esté calculado en el useEffect
                }}
                style={{
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transformOrigin: 'center center',
                  willChange: 'transform'
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


