// components/NewsDataViz.tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NewsDataViz() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Data - fake news spread by platform
    const data = [
      { platform: 'Social Media', percentage: 62, color: 0xff5252 },
      { platform: 'Messaging Apps', percentage: 23, color: 0x4fc3f7 },
      { platform: 'News Sites', percentage: 9, color: 0x66bb6a },
      { platform: 'Other', percentage: 6, color: 0xffa726 }
    ];

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create bars
    const bars: THREE.Mesh[] = [];
    data.forEach((item, i) => {
      const height = item.percentage / 10;
      const geometry = new THREE.BoxGeometry(1.5, height, 1.5);
      const material = new THREE.MeshPhongMaterial({ 
        color: item.color,
        transparent: true,
        opacity: 0.9
      });
      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = (i - (data.length - 1) / 2) * 2.5;
      bar.position.y = height / 2;
      scene.add(bar);
      bars.push(bar);
    });

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Camera position
    camera.position.z = 10;
    camera.position.y = 3;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate bars
      bars.forEach((bar, i) => {
        const targetHeight = data[i].percentage / 10;
        bar.scale.y += (targetHeight - bar.scale.y) * 0.05;
        bar.position.y = bar.scale.y / 2;
      });
      
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