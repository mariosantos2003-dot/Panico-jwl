// src/components/ModelViewer/ModelViewer.jsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import "./ModelViewer.css"; // Añadimos estilos para overlay

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.rotation.set(Math.PI / 2, -1, -1); // dedos hacia abajo
    scene.position.set(2, -1, 0.5);           // centro vertical
    scene.scale.set(0.5, 0.5, 0.5);         // escala adecuada
  }, [scene]);

  return <primitive object={scene} />;
}

function ModelViewer({ modelPath, onClose = () => {} }) 
    {
  return (
    <div className="model-overlay">
        <button className="close-3d-button" onClick={onClose}>
        ✕
        </button>
      <Canvas camera={{ position: [10, 1, 2.5], fov: 35 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Model modelPath={modelPath} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ModelViewer;
