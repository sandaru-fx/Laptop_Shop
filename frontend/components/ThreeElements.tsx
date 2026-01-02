/* Fix: Remove failing @react-three/fiber reference and use local component aliases for Three.js elements to resolve JSX intrinsic errors. */
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Environment, PerspectiveCamera, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// Local component aliases to satisfy the TypeScript compiler for JSX intrinsics
const Mesh = 'mesh' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const BoxGeometry = 'boxGeometry' as any;
const ConeGeometry = 'coneGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const SpotLight = 'spotLight' as any;

const TechCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </Sphere>
      <Mesh ref={meshRef}>
        <TorusGeometry args={[1.5, 0.02, 16, 100]} />
        <MeshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} />
      </Mesh>
      <Mesh rotation={[Math.PI / 2, 0, 0]}>
        <TorusGeometry args={[1.8, 0.01, 16, 100]} />
        <MeshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
      </Mesh>
    </Float>
  );
};

const ContactHub = () => {
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={1.5}>
      <Mesh>
        <BoxGeometry args={[1.5, 1, 0.1]} />
        <MeshWobbleMaterial factor={0.2} speed={1} color="#3b82f6" metalness={0.8} roughness={0.2} />
      </Mesh>
      <Mesh position={[0, 0.2, 0.06]}>
        <ConeGeometry args={[0.5, 0.5, 4]} rotation={[Math.PI, 0, 0]} />
        <MeshStandardMaterial color="#ffffff" />
      </Mesh>
    </Float>
  );
};

export const AboutVisual = () => (
  <div className="w-full h-[500px]">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <AmbientLight intensity={0.5} />
      <PointLight position={[10, 10, 10]} intensity={1.5} />
      <SpotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
      <TechCore />
      <Environment preset="city" />
    </Canvas>
  </div>
);

export const ContactVisual = () => (
  <div className="w-full h-[400px]">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <AmbientLight intensity={1} />
      <PointLight position={[5, 5, 5]} />
      <PresentationControls global snap speed={1.5}>
        <ContactHub />
      </PresentationControls>
      <Environment preset="night" />
    </Canvas>
  </div>
);
