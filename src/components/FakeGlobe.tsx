'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, Suspense } from 'react';

interface EarthProps {
  autoRotate?: boolean;
  rotationSpeed?: number;
  showAtmosphere?: boolean;
  showStars?: boolean;
  showControls?: boolean;
}

function Earth({ autoRotate = true, rotationSpeed = 0.5 }: Pick<EarthProps, 'autoRotate' | 'rotationSpeed'>) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // Load all textures in parallel
  const [earthMap, bumpMap, specularMap, cloudsMap] = useTexture([
    // '/textures/earth_map.jpg',
    // '/textures/earth_bump.jpg',
    // '/textures/earth_specular.jpg',
    // '/textures/earth_clouds.png' // Semi-transparent cloud texture
  ]);

  // Animation loop
  // useFrame(({ clock }) => {
  //   if (earthRef.current) {
  //     earthRef.current.rotation.y += autoRotate ? 0.001 * rotationSpeed : 0;
  //   }
  //   if (cloudsRef.current) {
  //     cloudsRef.current.rotation.y += autoRotate ? 0.0011 * rotationSpeed : 0; // Slightly faster than earth
  //   }
  // });

  return (
    <group>
      {/* Earth Sphere */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color('grey')}
          shininess={5}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.1, 64, 64]} />
      <meshStandardMaterial
        color={new THREE.Color(0x3399ff)}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function Lighting() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  // useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, 'hotpink');
  
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={dirLightRef}
        position={[5, 3, 5]}
        intensity={1.5}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

export default function RevolvingEarth({
  autoRotate = true,
  rotationSpeed = 1,
  showAtmosphere = true,
  showStars = true,
  showControls = true
}: EarthProps) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <Canvas
        shadows
        camera={{
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        {/* <Perf position="top-left" /> */}
        
        <Suspense fallback={null}>
          <Lighting />
          <Earth autoRotate={autoRotate} rotationSpeed={rotationSpeed} />
          
          {showAtmosphere && <Atmosphere />}
          {showStars && (
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          )}
          
          {showControls && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={rotationSpeed}
              minDistance={3}
              maxDistance={8}
              makeDefault
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
