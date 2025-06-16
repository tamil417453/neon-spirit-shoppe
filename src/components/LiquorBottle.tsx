
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  alcohol: string;
  description: string;
}

interface LiquorBottleProps {
  product: Product;
  position?: [number, number, number];
}

export const LiquorBottle = ({ product, position = [0, 0, 0] }: LiquorBottleProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.3, 2, 32]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.1} 
          metalness={0.8}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Bottle cap */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.9} />
      </mesh>
      
      {/* Label */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.8, 1.2]} />
        <meshStandardMaterial color="#000000" transparent={true} opacity={0.8} />
      </mesh>
    </group>
  );
};
