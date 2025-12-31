import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll inmediato al top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // También usar scrollTo tradicional como fallback
    window.scrollTo(0, 0);
    
    // Asegurar que el body y html también estén en el top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;

