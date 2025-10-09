import { memo } from 'react';
import { getOptimizedImageConfig } from '../utils/deviceDetection';

/**
 * Componente de imagen optimizado para diferentes dispositivos
 */
const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '',
  style = {},
  baseSize = 100,
  loading = 'lazy',
  priority = false,
  ...props 
}) => {
  const imageConfig = getOptimizedImageConfig(baseSize);
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : loading}
      decoding="async"
      style={{
        ...style,
        maxWidth: `${imageConfig.size}%`,
        maxHeight: `${imageConfig.size}%`,
        objectFit: 'contain',
        willChange: 'auto', // Evitar compositing layers innecesarios
      }}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
