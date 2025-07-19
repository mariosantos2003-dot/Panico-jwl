import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";
import Dither from "../React-Bits/Dither/Dither";


function LogoModel() {
  const { scene } = useGLTF("/assets/Final-Logo.glb");
  return <primitive object={scene} scale={[1, 1, 1]} />;
}

export default function Logo3D() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh",backgroundColor: "#000" }}>
      
      {/* Dither como fondo */}
      <div style={{ 
        position: "absolute", 
     
        width: "100%", 
        height: "100%", 
        zIndex: 0 
      }}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      
      {/* Canvas con el logo encima */}
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          background: "transparent"
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="sunset" />
          
          <LogoModel />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}