import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './NavigationCarousel.css';

const NavigationCarousel = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = [
    {
      id: 1,
      title: 'PLANNING',
      image: './06.png',
      alt: 'Planning Solution'
    },
    {
      id: 2,
      title: 'DRAWINGS',
      image: '/drawings/08_background.png',
      alt: 'Drawings'
    },
    {
      id: 3,
      title: 'DETAILS',
      image: '/details/1-1.png',
      alt: 'Details'
    },
    {
      id: 4,
      title: 'IMPLEMENTS',
      image: '/IMPLEMENT/5.jpg',
      alt: 'Implements'
    }
  ];

  // Duplicar categorías para el loop infinito
  const duplicatedCategories = [...categories, ...categories];

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category.title);
    
    // Navigate to different pages based on category
    switch (category.title) {
      case 'PLANNING':
        navigate('/planning-solution');
        break;
      case 'DRAWINGS':
        navigate('/drawings');
        break;
      case 'DETAILS':
        navigate('/details');
        break;
      case 'IMPLEMENTS':
        navigate('/implements');
        break;
      default:
        console.log('Unknown category:', category.title);
    }
  };

  return (
    <section className="navigation" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="carousel-wrapper">
            <button 
              className="custom-nav-button custom-nav-button-prev"
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slidePrev();
                }
              }}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                // Iniciar en el primer slide del primer grupo
                if (swiper) {
                  swiper.slideToLoop(0);
                }
              }}
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={3}
              slidesPerGroup={1}
              navigation={false}
              pagination={false}
              loop={true}
              loopPreventsSliding={false}
              watchOverflow={false}
              loopAdditionalSlides={2}
              loopedSlides={4}
              speed={600}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  slidesPerGroup: 1,
                  loopAdditionalSlides: 2,
                  loopedSlides: 4
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                  slidesPerGroup: 1,
                  loopAdditionalSlides: 2,
                  loopedSlides: 4
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                  slidesPerGroup: 1,
                  loopAdditionalSlides: 2,
                  loopedSlides: 4
                }
              }}
              className="nav-carousel"
            >
              {duplicatedCategories.map((category, index) => (
                <SwiperSlide key={`${category.id}-${index}`}>
                  <motion.div 
                    className="nav-category"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h3 className="nav-title">{category.title}</h3>
                    <div className="nav-image">
                      <img src={category.image} alt={category.alt} className="nav-image-real" />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button 
              className="custom-nav-button custom-nav-button-next"
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideNext();
                }
              }}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NavigationCarousel; 