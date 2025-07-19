import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import Dither from "../React-Bits/Dither/Dither";

function LogoModel() {
  const gltf = useGLTF("/assets/Final-Logo.glb");
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  return <primitive object={scene} scale={[1, 1, 1]} />;
}

export default function Logo3D() {
  // Detectar dispositivos de bajo rendimiento
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const pixelRatio = isMobile ? [0.5, 1] : [1, 2];

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "#000" }}>
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
          enableMouseInteraction={false}
          colorNum={isMobile ? 4 : 8}
          waveAmplitude={0.4}
          waveFrequency={1}
          waveSpeed={0.02}
        />
      </div>

      {/* Canvas con el logo encima */}
      <Canvas
        dpr={pixelRatio}
        performance={{ min: 0.5 }}
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          background: "transparent",
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          {!isMobile && <Environment preset="sunset" />}

          <LogoModel />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={false}
            dampingFactor={0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Precargar el modelo
useGLTF.preload("/assets/Final-Logo.glb");