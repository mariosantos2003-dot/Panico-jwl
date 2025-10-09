import { useState, useEffect, useMemo } from "react";
import Dither from "../React-Bits/Dither/Dither";
import { isMobileDevice, debounce } from "../../utils/deviceDetection";
import LightRays from "../React-Bits/LightRays/LightRays";

export default function Logo() {
  // Estados para responsive
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  // Detectar tipo de dispositivo - memoizado para evitar recalcular
  const deviceInfo = useMemo(() => {
    const isMobile = isMobileDevice();
    const isSmallMobile = dimensions.width <= 480;
    return { isMobile, isSmallMobile };
  }, [dimensions.width]);

  const { isMobile, isSmallMobile } = deviceInfo;

  // Configuraciones responsive simplificadas - memoizado
  const config = useMemo(() => {
    if (isSmallMobile) {
      return {
        ditherColors: 2, // Reducido de 1 a 2 para mejor calidad visual
        height: "80vh",
        imageSize: "60%",
        pixelSize: 4 // Reducir resolución en mobile pequeño
      };
    } else if (isMobile) {
      return {
        ditherColors: 2,
        height: "90vh",
        imageSize: "50%",
        pixelSize: 3
      };
    } else {
      return {
        ditherColors: 8,
        height: "100vh",
        imageSize: "50%",
        pixelSize: 2
      };
    }
  }, [isSmallMobile, isMobile]);

  // Escuchar cambios de tamaño de ventana con debounce optimizado
  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 200); // Aumentado a 200ms para mejor rendimiento

    window.addEventListener('resize', handleResize);
    return () => {
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
      {/* LightRays como fondo */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff0000ff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Imagen encima del LightRays */}
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
          loading="eager"
          decoding="async"
          style={{
            maxWidth: config.imageSize,
            maxHeight: config.imageSize,
            objectFit: "contain",
            willChange: "auto" // Evitar compositing layers innecesarios
          }}
        />
      </div>
    </div>
  );
}
