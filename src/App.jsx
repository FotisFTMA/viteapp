import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model.jsx';
import { MathUtils } from 'three';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function CameraSpotlight() {
  const lightRef = useRef();
  const target = [0, 0, 0]; // Always point to the model

  useFrame(({ camera }) => {
    if (lightRef.current) {
      // Keep spotlight right behind the camera
      lightRef.current.position.copy(camera.position);
      lightRef.current.target.position.set(...target);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <spotLight
      ref={lightRef}
      angle={Math.PI / 6}    // cone width
      penumbra={0.5}         // softer edges
      intensity={5.5}        // adjust glare brightness
      distance={70}          // how far it reaches
      color="white"
    />
  );
}

function App() {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle, #1a1a1a, #000000)',
      }}
      camera={{ fov: 50, position: [0, 1, 6.5] }}
    >
      <Stars radius={1} depth={210} count={10000} factor={4} fade />

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.5}
        />
      </EffectComposer>

      {/* Ambient and main fill */}
      <ambientLight intensity={1.9} />

      {/* Camera-following glare spotlight */}
      <CameraSpotlight />

      {/* Your 3D model */}
      <Model
        castShadow
        receiveShadow
        position={[0, -0.15, 0.07]}
        scale={0.4}
        rotation={[MathUtils.degToRad(180), 1.6, 0]}
      />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxPolarAngle={Math.PI * 2}
        minPolarAngle={0}
        rotateSpeed={1}
        target={[0, 0, 0]}
        maxAzimuthAngle={Infinity}
        minAzimuthAngle={-Infinity}
      />
    </Canvas>
  );
}

export default App;
