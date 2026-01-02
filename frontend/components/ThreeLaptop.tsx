/* Fix: Remove failing @react-three/fiber reference and use local component aliases for Three.js elements to resolve JSX intrinsic errors. */
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// Local component aliases to satisfy the TypeScript compiler for JSX intrinsics
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const PlaneGeometry = 'planeGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

const LaptopModel = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Group ref={meshRef}>
      {/* Base */}
      <Mesh position={[0, -0.05, 0]}>
        <BoxGeometry args={[4, 0.1, 2.8]} />
        <MeshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </Mesh>
      
      {/* Keyboard Area */}
      <Mesh position={[0, 0.01, 0.2]}>
        <BoxGeometry args={[3.6, 0.02, 1.8]} />
        <MeshStandardMaterial color="#0f172a" />
      </Mesh>

      {/* Screen Hinge & Lid */}
      <Group position={[0, 0, -1.4]} rotation={[-Math.PI / 2.5, 0, 0]}>
        {/* Lid */}
        <Mesh position={[0, 1.4, 0]}>
          <BoxGeometry args={[4, 2.8, 0.08]} />
          <MeshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </Mesh>
        {/* Screen */}
        <Mesh position={[0, 1.4, 0.05]}>
          <PlaneGeometry args={[3.8, 2.6]} />
          <MeshStandardMaterial color="#000" emissive="#1e293b" emissiveIntensity={0.5} />
        </Mesh>
      </Group>
    </Group>
  );
};

export const LaptopCanvas = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
        <AmbientLight intensity={0.5} />
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <LaptopModel />
          </Float>
        </PresentationControls>

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
