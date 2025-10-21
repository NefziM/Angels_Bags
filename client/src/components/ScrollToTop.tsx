import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantané en haut de la page
    window.scrollTo(0, 0);
    
    // Alternative avec animation douce (optionnel)
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  }, [pathname]);

  return null;
};

export default ScrollToTop;