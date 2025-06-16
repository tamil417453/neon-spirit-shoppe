
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface LiquorBottleProps {
  product: {
    name: string;
    category: string;
  };
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const LiquorBottle = ({ product, position = [0, 0, 0], rotation = [0, 0, 0] }: LiquorBottleProps) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getBottleColor = (category: string) => {
    switch (category) {
      case 'rum': return '#8B4513';
      case 'vodka': return '#E6E6FA';
      case 'beer': return '#DAA520';
      default: return '#4A5568';
    }
  };

  const bottleColor = getBottleColor(product.category);

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Bottle Body */}
      <Cylinder args={[0.8, 1, 3, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={bottleColor}
          transparent
          opacity={0.9}
          transmission={0.9}
          roughness={0.1}
          metalness={0.1}
          ior={1.5}
        />
      </Cylinder>

      {/* Bottle Neck */}
      <Cylinder args={[0.3, 0.4, 1, 32]} position={[0, 2, 0]}>
        <meshPhysicalMaterial
          color={bottleColor}
          transparent
          opacity={0.9}
          transmission={0.9}
          roughness={0.1}
          metalness={0.1}
          ior={1.5}
        />
      </Cylinder>

      {/* Bottle Cap */}
      <Cylinder args={[0.35, 0.35, 0.2, 32]} position={[0, 2.6, 0]}>
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Label */}
      <mesh position={[0, 0.5, 0.81]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" opacity={0.8} transparent />
      </mesh>

      {/* Liquid inside */}
      <Cylinder args={[0.75, 0.95, 2.8, 32]} position={[0, -0.1, 0]}>
        <meshPhysicalMaterial
          color={product.category === 'beer' ? '#FFA500' : '#8B4513'}
          transparent
          opacity={0.7}
          transmission={0.3}
          roughness={0.0}
          metalness={0.0}
        />
      </Cylinder>

      {/* Highlight reflections */}
      <Sphere args={[0.1]} position={[-0.6, 1, 0.6]}>
        <meshBasicMaterial color="white" transparent opacity={0.8} />
      </Sphere>
      
      <Sphere args={[0.05]} position={[0.5, 0.5, 0.7]}>
        <meshBasicMaterial color="white" transparent opacity={0.6} />
      </Sphere>
    </group>
  );
};
