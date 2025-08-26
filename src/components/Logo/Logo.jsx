import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useMemo, useState, useEffect } from "react";
import Dither from "../React-Bits/Dither/Dither";

function LogoModel({ scale, position }) {
  const gltf = useGLTF("/assets/Final-Logo.glb");
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  return <primitive object={scene} scale={scale} position={position} />;
}

export default function Logo3D() {
  // Estados para responsive
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  // Detectar tipo de dispositivo
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );
  const isTablet = dimensions.width >= 768 && dimensions.width <= 1024;
  const isSmallMobile = dimensions.width <= 480;

  // Configuraciones responsive
  const getResponsiveConfig = () => {
    if (isSmallMobile) {
      return {
        pixelRatio: [0.3, 0.8],
        logoScale: [0.6, 0.6, 0.6],
        logoPosition: [0, 0, 0],
        cameraPosition: [0, 0, 6],
        cameraFov: 60,
        ditherColors: 3,
        ambientIntensity: 0.3,
        directionalIntensity: 0.4,
        height: "80vh"
      };
    } else if (isMobile) {
      return {
        pixelRatio: [0.5, 1],
        logoScale: [0.8, 0.8, 0.8],
        logoPosition: [0, 0, 0],
        cameraPosition: [0, 0, 5.5],
        cameraFov: 55,
        ditherColors: 4,
        ambientIntensity: 0.25,
        directionalIntensity: 0.5,
        height: "90vh"
      };
    } else if (isTablet) {
      return {
        pixelRatio: [0.8, 1.5],
        logoScale: [0.9, 0.9, 0.9],
        logoPosition: [0, 0, 0],
        cameraPosition: [0, 0, 5.2],
        cameraFov: 52,
        ditherColors: 6,
        ambientIntensity: 0.2,
        directionalIntensity: 0.55,
        height: "95vh"
      };
    } else {
      return {
        pixelRatio: [1, 2],
        logoScale: [1, 1, 1],
        logoPosition: [0, 0, 0],
        cameraPosition: [0, 0, 5],
        cameraFov: 50,
        ditherColors: 8,
        ambientIntensity: 0.2,
        directionalIntensity: 0.6,
        height: "100vh"
      };
    }
  };

  const config = getResponsiveConfig();

  // Escuchar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configuración de controles responsive
  const getControlsConfig = () => {
    if (isSmallMobile) {
      return {
        enableZoom: false,
        enablePan: false,
        enableRotate: true,
        autoRotate: false,
        dampingFactor: 0.15,
        rotateSpeed: 0.3,
        maxPolarAngle: Math.PI * 0.8,
        minPolarAngle: Math.PI * 0.2
      };
    } else if (isMobile) {
      return {
        enableZoom: false,
        enablePan: false,
        enableRotate: true,
        autoRotate: false,
        dampingFactor: 0.1,
        rotateSpeed: 0.5,
        maxPolarAngle: Math.PI * 0.9,
        minPolarAngle: Math.PI * 0.1
      };
    } else {
      return {
        enableZoom: false,
        enablePan: false,
        enableRotate: true,
        autoRotate: false,
        dampingFactor: 0.1,
        rotateSpeed: 1,
        maxPolarAngle: Math.PI,
        minPolarAngle: 0
      };
    }
  };

  const controlsConfig = getControlsConfig();

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

      {/* Canvas con el logo encima */}
      <Canvas
        dpr={config.pixelRatio}
        performance={{ 
          min: isSmallMobile ? 0.3 : isMobile ? 0.4 : 0.5,
          max: isSmallMobile ? 0.7 : isMobile ? 0.8 : 1
        }}
        style={{
          height: config.height,
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          background: "transparent",
        }}
        camera={{ 
          position: config.cameraPosition, 
          fov: config.cameraFov,
          aspect: dimensions.width / dimensions.height
        }}
        gl={{
          antialias: !isSmallMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={config.ambientIntensity} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={config.directionalIntensity} 
          />
          {!isMobile && <Environment preset="sunset" />}

          <LogoModel 
            scale={config.logoScale} 
            position={config.logoPosition} 
          />
          <OrbitControls {...controlsConfig} />
        </Suspense>
      </Canvas>

    </div>
  );
}

// Precargar el modelo
useGLTF.preload("/assets/Final-Logo.glb");