// components/AIParticles.tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AIParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Positions
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Colors (blue and purple theme)
      colors[i * 3] = Math.random() * 0.2 + 0.5; // R
      colors[i * 3 + 1] = Math.random() * 0.2 + 0.3; // G
      colors[i * 3 + 2] = Math.random() * 0.2 + 0.7; // B
      
      // Sizes
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Add center sphere (AI core)
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4fc3f7,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Camera position
    camera.position.z = 15;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;
      
      // Animate particles toward center when detecting
      const positions = particles.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        if (Math.random() > 0.98) {
          // Simulate detection - particles move toward center
          positions[i * 3] *= 0.9;
          positions[i * 3 + 1] *= 0.9;
          positions[i * 3 + 2] *= 0.9;
        } else {
          // Random movement
          positions[i * 3] += (Math.random() - 0.5) * 0.02;
          positions[i * 3 + 1] += (Math.random() - 0.5) * 0.02;
          positions[i * 3 + 2] += (Math.random() - 0.5) * 0.02;
        }
      }
      particles.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = mountRef.current?.clientWidth || window.innerWidth;
      const height = mountRef.current?.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-96 rounded-2xl overflow-hidden shadow-lg"
    />
  );
}