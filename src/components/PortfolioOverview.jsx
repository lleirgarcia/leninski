import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PortfolioOverview.css';

const PortfolioOverview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="portfolio-overview">
      <div className="container">
        <motion.div 
          className="portfolio-content"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="portfolio-left">
            <motion.h2 
              className="portfolio-title"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              PORTFOLIO
            </motion.h2>
          </div>
          <div className="portfolio-right">
            <motion.p 
              className="portfolio-text"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Architecture is the art of thinking and realizing. This
              section is a selection of my key projects that
              showcase a diversity of approaches to architectural
              thinking, with attention to context, detail, form, and
              function.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioOverview; 