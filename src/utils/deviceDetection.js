/**
 * Utilidades para detectar el tipo de dispositivo y optimizar rendimiento
 */

// Detectar si es dispositivo móvil
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Detectar si es tablet
export const isTablet = () => {
  return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(
    navigator.userAgent
  );
};

// Detectar si es dispositivo de baja potencia
export const isLowEndDevice = () => {
  // Verificar número de cores
  const cores = navigator.hardwareConcurrency || 2;
  
  // Verificar memoria (si está disponible)
  const memory = navigator.deviceMemory || 4;
  
  // Considerar dispositivo de baja potencia si:
  // - Tiene menos de 4 cores
  // - O tiene menos de 4GB de RAM
  return cores < 4 || memory < 4;
};

// Obtener configuración optimizada para Canvas/3D
export const getOptimizedCanvasConfig = () => {
  const isMobile = isMobileDevice();
  const isLowEnd = isLowEndDevice();
  
  return {
    // Device Pixel Ratio optimizado
    dpr: isMobile 
      ? Math.min(window.devicePixelRatio, 1) 
      : Math.min(window.devicePixelRatio, 2),
    
    // Antialiasing
    antialias: !isMobile && !isLowEnd,
    
    // Frame loop mode
    frameloop: isMobile || isLowEnd ? 'demand' : 'always',
    
    // Configuración WebGL
    gl: {
      antialias: !isMobile && !isLowEnd,
      powerPreference: isLowEnd ? 'default' : 'high-performance',
      stencil: false,
      depth: !isLowEnd,
      alpha: false,
      preserveDrawingBuffer: false,
    },
  };
};

// Obtener configuración optimizada para animaciones
export const getOptimizedAnimationConfig = () => {
  const isMobile = isMobileDevice();
  const isLowEnd = isLowEndDevice();
  
  return {
    // Reducir duración de animaciones en mobile
    durationMultiplier: isMobile ? 0.7 : 1,
    
    // Reducir delays en mobile
    delayMultiplier: isMobile ? 0.5 : 1,
    
    // Simplificar animaciones en dispositivos de baja potencia
    simplifyAnimations: isLowEnd,
    
    // Desactivar animaciones complejas en mobile
    disableComplexAnimations: isMobile || isLowEnd,
    
    // Reducir blur effects
    maxBlur: isMobile ? 5 : 10,
  };
};

// Obtener configuración optimizada para imágenes
export const getOptimizedImageConfig = (baseSize) => {
  const isMobile = isMobileDevice();
  const width = window.innerWidth;
  
  if (width <= 480) {
    return {
      size: baseSize * 0.6,
      quality: 'low',
    };
  } else if (isMobile) {
    return {
      size: baseSize * 0.8,
      quality: 'medium',
    };
  }
  
  return {
    size: baseSize,
    quality: 'high',
  };
};

// Utilidad para debounce (optimizar resize handlers)
export const debounce = (func, wait = 150) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Utilidad para throttle (optimizar scroll handlers)
export const throttle = (func, limit = 16) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
