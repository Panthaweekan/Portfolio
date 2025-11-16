import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.8} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#9C83FF"
          attach="material"
          distort={0.5}
          speed={2.5}
          roughness={0.1}
          metalness={0.9}
          emissive="#9C83FF"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[-3, 1, -1]}>
        <torusGeometry args={[0.8, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#FF9051"
          wireframe
          emissive="#FF9051"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.8}>
      <mesh ref={meshRef} position={[3, -1, -2]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color="#A0A0A0"
          wireframe
          emissive="#A0A0A0"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark as loaded after a brief delay to ensure canvas is ready
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (hasError) {
    console.warn('ThreeBackground failed to load');
    return null;
  }

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      data-testid="three-background"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 0.8 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
          console.log('Three.js Canvas created successfully');
        }}
        onError={(error) => {
          console.error('Three.js Canvas error:', error);
          setHasError(true);
        }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 15]} />

        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#9C83FF" />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#FF9051" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* 3D Objects */}
        <AnimatedSphere />
        <AnimatedTorus />
        <AnimatedBox />

        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
