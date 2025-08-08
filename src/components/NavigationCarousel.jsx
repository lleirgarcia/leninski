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
      title: 'MOODBOARD',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Moodboard'
    },
    {
      id: 3,
      title: 'DRAWINGS',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Drawings'
    },
    {
      id: 4,
      title: 'DETAILS',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Details'
    },
    {
      id: 5,
      title: 'IMPLEMENTS',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
      case 'MOODBOARD':
        // Navigate to Moodboard page (to be created)
        console.log('Navigate to Moodboard page');
        break;
      case 'DRAWINGS':
        // Navigate to Drawings page (to be created)
        console.log('Navigate to Drawings page');
        break;
      case 'DETAILS':
        // Navigate to Details page (to be created)
        console.log('Navigate to Details page');
        break;
      case 'IMPLEMENTS':
        // Navigate to Implements page (to be created)
        console.log('Navigate to Implements page');
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
                  whileHover={{ scale: 1.02 }}
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