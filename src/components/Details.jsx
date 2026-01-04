import React, { useState, useRef, useEffect } from 'react';
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
  const [zoomLevel, setZoomLevel] = useState(2); // Zoom inicial: 2x (zoom +1)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [initialScale, setInitialScale] = useState(0); // Se calculará cuando la imagen cargue
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader
  
  // 2 niveles de zoom fijos: 2x, 3x
  const zoomLevels = [2, 3];

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);

  const handleImageClick = (imageSrc) => {
    // No abrir imágenes en móviles
    if (isMobile) {
      return;
    }
    
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
      x: e.clientX || e.touches?.[0]?.clientX || 0,
      y: e.clientY || e.touches?.[0]?.clientY || 0
    });
  };

  // Handler para touch en móviles
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX,
      y: touch.clientY
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
          const clientX = e.clientX || e.touches?.[0]?.clientX || lastMouseX;
          const clientY = e.clientY || e.touches?.[0]?.clientY || lastMouseY;
          const deltaX = (clientX - lastMouseX) * dragSensitivity;
          const deltaY = (clientY - lastMouseY) * dragSensitivity;
          
          setPosition((prevPosition) => ({
            x: prevPosition.x + deltaX,
            y: prevPosition.y + deltaY
          }));
          
          // Actualizar lastMouse para el próximo movimiento
          lastMouseX = clientX;
          lastMouseY = clientY;
        });
      };

      const handleGlobalMouseUp = () => {
        setIsDragging(false);
      };

      const handleGlobalTouchMove = (e) => {
        e.preventDefault();
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          requestAnimationFrame(() => {
            const deltaX = (touch.clientX - lastMouseX) * dragSensitivity;
            const deltaY = (touch.clientY - lastMouseY) * dragSensitivity;
            
            setPosition((prevPosition) => ({
              x: prevPosition.x + deltaX,
              y: prevPosition.y + deltaY
            }));
            
            lastMouseX = touch.clientX;
            lastMouseY = touch.clientY;
          });
        }
      };

      const handleGlobalTouchEnd = () => {
        setIsDragging(false);
      };

      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleGlobalTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('touchmove', handleGlobalTouchMove);
        window.removeEventListener('touchend', handleGlobalTouchEnd);
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
            // Imagen más ancha - ajustar al ancho del viewport (usar 1.0 para cubrir completamente)
            scale = viewportWidth / img.naturalWidth;
          } else {
            // Imagen más alta - ajustar al alto del viewport (usar 1.0 para cubrir completamente)
            scale = viewportHeight / img.naturalHeight;
          }
          
          // Asegurar que la imagen siempre cubra el viewport completamente
          // Multiplicar por un factor para que sea ligeramente más grande
          scale = scale * 1.1;
          
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
    if (zoomedImage && imageRef.current && initialScale > 0 && !isLoading) {
      const img = imageRef.current;
      if (img.complete && img.naturalWidth && img.naturalHeight) {
        // Aplicar estilos de tamaño manteniendo el aspect ratio original
        img.style.width = `${img.naturalWidth}px`;
        img.style.height = `${img.naturalHeight}px`;
        img.style.maxWidth = 'none';
        img.style.maxHeight = 'none';
        img.style.minWidth = 'none';
        img.style.minHeight = 'none';
        img.style.display = 'block';
        img.style.objectFit = 'none'; // Desactivar object-fit para mantener dimensiones exactas
        img.style.aspectRatio = 'auto'; // Permitir aspect ratio natural
        
        // Calcular el scale total: initialScale * zoomLevel
        const totalScale = initialScale * zoomLevel;
        const transform = `scale(${totalScale}) translate(${position.x}px, ${position.y}px)`;
        img.style.setProperty('transform', transform, 'important');
        
        // Mostrar la imagen solo cuando todo esté listo y el loader haya terminado
        requestAnimationFrame(() => {
          img.style.opacity = '1';
        });
      }
    } else if (zoomedImage && imageRef.current && isLoading) {
      // Ocultar imagen mientras carga
      const img = imageRef.current;
      img.style.opacity = '0';
    }
  }, [zoomLevel, position, zoomedImage, initialScale, isLoading]);

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
                {...(!isMobile && {
                  onClick: () => handleImageClick('/details/01.png')
                })}
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
                {...(!isMobile && {
                  onClick: () => handleImageClick('/details/02.png')
                })}
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
                {...(!isMobile && {
                  onClick: () => handleImageClick('/details/03.png')
                })}
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
                {...(!isMobile && {
                  onClick: () => handleImageClick('/details/04.png')
                })}
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
                {...(!isMobile && {
                  onClick: () => handleImageClick('/details/05.png')
                })}
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
            {isLoading && (
              <div className="zoom-loader" onClick={(e) => e.stopPropagation()}>
                <div className="loader-spinner"></div>
              </div>
            )}
            <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
              {zoomLevel < 3 && (
                <button type="button" onClick={handleZoomIn} className="zoom-btn">+</button>
              )}
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
              onTouchStart={handleTouchStart}
              onClick={(e) => e.stopPropagation()}
            >
                <img
                  ref={imageRef}
                  src={zoomedImage}
                  alt="Zoomed Detail"
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

export default Details;
