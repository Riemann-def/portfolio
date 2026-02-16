'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Mouse tracker (screen-space -1..1) ─────────────────────── */

const mouse = { x: 0, y: 0 };

function useGlobalMouse() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
}

/* ─── Sphere scene (inner R3F component) ─────────────────────── */

export interface LightConfig {
  color: string;
  intensity: number;
  position: [number, number, number];
  distance?: number;
}

export const DEFAULT_LIGHTS: LightConfig[] = [
  { color: '#0002ee', intensity: 80, position: [-24, -20, -15], distance: 60 },
  { color: '#ff0114', intensity: 120, position: [23, 14, 15], distance: 60 },
  { color: '#d40ade', intensity: 60, position: [3, -14, -13], distance: 60 },
  { color: '#de2d05', intensity: 80, position: [-1, 11, 0], distance: 60 },
];

interface SphereSceneProps {
  lights?: LightConfig[];
  ambientIntensity?: number;
  followRange?: number;
  followSpeed?: number;
  rotationRange?: number;
  rotationSpeed?: number;
  autoSpinSpeed?: number;
}

function SphereScene({
  lights = DEFAULT_LIGHTS,
  ambientIntensity = 0.01,
  followRange = 0.15,
  followSpeed = 0.005,
  rotationRange = 0.3,
  rotationSpeed = 0.02,
  autoSpinSpeed = 0.06,
}: SphereSceneProps) {
  const { scene } = useGLTF('/models/hero-element.gltf');
  const groupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  // Extract only the sphere mesh from the GLTF — discard embedded lights
  // (Blender's KHR_lights_punctual intensities don't translate well to Three.js)
  const sphereMesh = useMemo(() => {
    let mesh: THREE.Mesh | null = null;
    scene.traverse((child) => {
      if (child.name === 'sphere' && (child as THREE.Mesh).isMesh) {
        mesh = (child as THREE.Mesh).clone(true);
        // Override the GLTF material — original has roughness 1.0 which
        // makes it fully diffuse and unable to pick up colored light.
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#e0e0e0',
          metalness: 0.6,
          roughness: 0.2,
        });
      }
    });
    return mesh;
  }, [scene]);

  const smoothRotation = useRef({ x: 0, y: 0 });
  const smoothPosition = useRef({ x: 0, y: 0 });
  const autoRotation = useRef(0);

  useGlobalMouse();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 0.1);

    // Auto-rotate
    autoRotation.current += dt * autoSpinSpeed;

    // Mouse-linked rotation
    const targetRotX = mouse.y * rotationRange;
    const targetRotY = mouse.x * rotationRange + autoRotation.current;

    smoothRotation.current.x += (targetRotX - smoothRotation.current.x) * rotationSpeed;
    smoothRotation.current.y += (targetRotY - smoothRotation.current.y) * rotationSpeed;

    groupRef.current.rotation.x = smoothRotation.current.x;
    groupRef.current.rotation.y = smoothRotation.current.y;

    // Mouse-linked position drift
    const targetPosX = mouse.x * viewport.width * followRange;
    const targetPosY = mouse.y * viewport.height * followRange;

    smoothPosition.current.x += (targetPosX - smoothPosition.current.x) * followSpeed;
    smoothPosition.current.y += (targetPosY - smoothPosition.current.y) * followSpeed;

    groupRef.current.position.x = smoothPosition.current.x;
    groupRef.current.position.y = smoothPosition.current.y;
  });

  return (
    <>
      {lights.map((light, i) => (
        <pointLight key={i} color={light.color} intensity={light.intensity} position={light.position} distance={light.distance ?? 60} />
      ))}
      <ambientLight intensity={ambientIntensity} />

      <group ref={groupRef}>
        {sphereMesh && <primitive object={sphereMesh} />}
      </group>
    </>
  );
}

/* ─── Public component ───────────────────────────────────────── */

interface HeroSphereProps extends SphereSceneProps {
  className?: string;
}

export default function HeroSphere({
  className = '',
  ...sceneProps
}: HeroSphereProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 32 : 28], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        <SphereScene {...sceneProps} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/hero-element.gltf');
