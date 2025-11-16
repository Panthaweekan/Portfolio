import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeConfig {
  type: 'box' | 'sphere' | 'torus' | 'octahedron' | 'tetrahedron';
  position: [number, number, number];
  scale: number;
  color: string;
  wireframe?: boolean;
}

// Geometric shape component
function GeometricShape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  const getGeometry = () => {
    switch (config.type) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1]} />;
      case 'box':
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={config.position} scale={config.scale}>
        {getGeometry()}
        <meshStandardMaterial
          color={config.color}
          wireframe={config.wireframe}
          emissive={config.color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

interface FloatingShapes3DProps {
  shapes?: ShapeConfig[];
  className?: string;
}

// Default shapes configuration
const DEFAULT_SHAPES: ShapeConfig[] = [
  {
    type: 'octahedron',
    position: [-2, 1, -2],
    scale: 0.8,
    color: '#9C83FF',
    wireframe: true,
  },
  {
    type: 'tetrahedron',
    position: [2, -1, -1],
    scale: 0.6,
    color: '#FF9051',
    wireframe: true,
  },
  {
    type: 'torus',
    position: [0, 0, -3],
    scale: 0.5,
    color: '#2DBBEE',
    wireframe: true,
  },
];

export function FloatingShapes3D({
  shapes = DEFAULT_SHAPES,
  className = ''
}: FloatingShapes3DProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 50 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.6,
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0);
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#9C83FF" />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color="#FF9051" />

          {shapes.map((shape, index) => (
            <GeometricShape key={index} config={shape} />
          ))}
        </Canvas>
      </Suspense>
    </div>
  );
}
