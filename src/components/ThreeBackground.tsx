import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Main animated sphere with distortion
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

// Wireframe Torus
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
      <mesh ref={meshRef} position={[-4, 1, -1]}>
        <torusGeometry args={[1, 0.35, 16, 100]} />
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

// Geometric Octahedron with holographic effect
function AnimatedOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.18;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={2.2}>
      <mesh ref={meshRef} position={[4, -2, -3]} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#2DBBEE"
          wireframe
          emissive="#2DBBEE"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

// Icosahedron with glass-like material
function AnimatedIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.6}>
      <mesh ref={meshRef} position={[-3, -2, -2]} scale={0.9}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#B19BFF"
          metalness={0.9}
          roughness={0.1}
          transmission={0.5}
          thickness={0.5}
          emissive="#B19BFF"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Dodecahedron wireframe
function AnimatedDodecahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.9} floatIntensity={1.9}>
      <mesh ref={meshRef} position={[3, 2, -2.5]} scale={0.7}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FF9051"
          wireframe={false}
          emissive="#FF9051"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Tetrahedron - small accent
function AnimatedTetrahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.5}>
      <mesh ref={meshRef} position={[-4, -1, -1.5]} scale={0.6}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#33C3F5"
          wireframe
          emissive="#33C3F5"
          emissiveIntensity={0.7}
        />
      </mesh>
    </Float>
  );
}

// Torus Knot - complex geometry
function AnimatedTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.08;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.3}>
      <mesh ref={meshRef} position={[2, 3, -4]} scale={0.5}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial
          color="#9C83FF"
          emissive="#9C83FF"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

// Small floating boxes scattered
function FloatingBoxes() {
  const groupRef = useRef<THREE.Group>(null);
  const boxes = Array.from({ length: 5 }, (_, i) => ({
    position: [
      Math.random() * 8 - 4,
      Math.random() * 6 - 3,
      Math.random() * 4 - 5
    ] as [number, number, number],
    scale: Math.random() * 0.3 + 0.2,
    rotationSpeed: [
      Math.random() * 0.02,
      Math.random() * 0.02,
      Math.random() * 0.02
    ] as [number, number, number]
  }));

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const box = boxes[i];
        child.rotation.x += box.rotationSpeed[0];
        child.rotation.y += box.rotationSpeed[1];
        child.rotation.z += box.rotationSpeed[2];
      });
    }
  });

  return (
    <group ref={groupRef}>
      {boxes.map((box, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={1.5}>
          <mesh position={box.position} scale={box.scale}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#9C83FF" : "#FF9051"}
              wireframe
              emissive={i % 2 === 0 ? "#9C83FF" : "#FF9051"}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
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
        <fog attach="fog" args={['#000000', 5, 20]} />

        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />

        {/* Colored Point Lights */}
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#9C83FF" distance={15} />
        <pointLight position={[10, 5, 5]} intensity={1} color="#FF9051" distance={12} />
        <pointLight position={[0, -5, -3]} intensity={0.8} color="#2DBBEE" distance={10} />
        <pointLight position={[-5, 8, 2]} intensity={0.6} color="#B19BFF" distance={12} />

        {/* Spotlights for dramatic effect */}
        <spotLight
          position={[0, 8, 0]}
          angle={0.4}
          penumbra={1}
          intensity={0.7}
          color="#9C83FF"
          castShadow
        />
        <spotLight
          position={[5, -5, 5]}
          angle={0.3}
          penumbra={0.8}
          intensity={0.5}
          color="#FF9051"
        />

        {/* Main 3D Objects */}
        <AnimatedSphere />
        <AnimatedTorus />
        <AnimatedOctahedron />
        <AnimatedIcosahedron />
        <AnimatedDodecahedron />
        <AnimatedTetrahedron />
        <AnimatedTorusKnot />
        <FloatingBoxes />

        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
