import React from 'react';
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
      image: '/details/01.png',
      alt: 'Details'
    },
    {
      id: 4,
      title: 'IMPLEMENTS',
      image: '/IMPLEMENT/IZAKAYA/01.jpg',
      alt: 'Implements'
    }
  ];

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
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
            className="nav-carousel"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
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
        </motion.div>
      </div>
    </section>
  );
};

export default NavigationCarousel; 