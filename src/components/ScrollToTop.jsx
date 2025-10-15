import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('🔝 ScrollToTop ejecutado para:', pathname);
    
    // Múltiples métodos para asegurar el scroll
    // Método 1: scrollTo estándar
    window.scrollTo(0, 0);
    
    // Método 2: manipulación directa del DOM
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Método 3: con requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
