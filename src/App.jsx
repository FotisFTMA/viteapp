import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // Correct import from @react-three/drei
import { Model } from './Model.jsx'; // Your model import
import { BoxGeometry } from 'three';
import { MathUtils } from 'three';
import { Stars, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
function App() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', background: 'radial-gradient(circle, #1a1a1a, #000000)' }} camera={{ fov: 50, position: [0, 2, 6] }}>
      <ambientLight intensity={1.2} />
      <spotLight position={[0, 0, 2]} intensity={1.2} />
      {/*
      <mesh position={[0, 0, 0]} scale={0.4}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="hotpink" />
      </mesh>
       */}
      {/* Your 3D Model */}
      <Model position={[0, -0.15, 0.07]} scale={0.4} rotation={[MathUtils.degToRad(180), (1.6), (0)]}/>

      {/* OrbitControls to allow full 360-degree rotation around the model */}
      <OrbitControls 
        enablePan={false} // Disable panning
        enableZoom={true} // Allow zooming
        maxPolarAngle={Math.PI * 2} // Full 360-degree freedom vertically (up/down)
        minPolarAngle={0} // Allow flipping by setting the correct value
        rotateSpeed={1} // Adjust rotation speed
        target={[0, 0, 0]} // Make sure the camera rotates around the model's center
        maxAzimuthAngle={Infinity} // No limit on horizontal rotation (left/right)
        minAzimuthAngle={-Infinity} // No limit on horizontal rotation (left/right)
      />

    </Canvas>
    
  );
}

export default App;
