import { useState, useEffect } from "react";
import Dither from "../React-Bits/Dither/Dither";

export default function Logo() {
  // Estados para responsive
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  // Detectar tipo de dispositivo
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );
  const isSmallMobile = dimensions.width <= 480;

  // Configuraciones responsive simplificadas
  const getResponsiveConfig = () => {
    if (isSmallMobile) {
      return {
        ditherColors: 1,
        height: "80vh",
        imageSize: "60%"
      };
    } else if (isMobile) {
      return {
        ditherColors: 1,
        height: "90vh",
        imageSize: "50%"
      };
    } else {
      return {
        ditherColors: 8,
        height: "100vh",
        imageSize: "50%"
      };
    }
  };

  const config = getResponsiveConfig();

  // Escuchar cambios de tamaño de ventana con debounce
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      style={{ 
        position: "relative", 
        width: "100%", 
        height: config.height, 
        backgroundColor: "#000",
        overflow: "hidden"
      }}
    >
      {/* Dither como fondo */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={isMobile}
          enableMouseInteraction={!isMobile}
          colorNum={config.ditherColors}
          waveAmplitude={isSmallMobile ? 0.2 : 0.4}
          waveFrequency={isSmallMobile ? 0.5 : 1}
          waveSpeed={isSmallMobile ? 0.01 : 0.02}
        />
      </div>

      {/* Imagen encima del Dither */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/assets/Pánico_Full_Render_Display.webp"
          alt="Pánico Logo"
          style={{
            maxWidth: config.imageSize,
            maxHeight: config.imageSize,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
