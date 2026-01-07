'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, Html } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import hotspotsConfig from '@/lib/data/hotspots-config.json';

interface HotspotProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
  size: {
    width: string;
    height: string;
  };
  content?: string[];
}

function Hotspot({ position, label, onClick, size, content }: HotspotProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* HTML TV Screen - Now clickable */}
      <Html
        distanceFactor={5}
        position={[0, 0, 0]}
        center
        style={{ pointerEvents: 'auto' }}
      >
        <div
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`bg-deep-black border-4 rounded-none transition-all duration-300 cursor-pointer overflow-hidden ${
            hovered
              ? 'border-terminal-green shadow-glow-green scale-105'
              : 'border-terminal-green-dark'
          }`}
          style={{ width: size.width, height: size.height }}
        >
          {/* TV Screen Header */}
          <div className="bg-panel-bg border-b-2 border-terminal-green-dark px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
              <p className={`font-mono text-xs uppercase tracking-wider ${
                hovered ? 'text-terminal-green' : 'text-terminal-green-dim'
              }`}>
                {label}
              </p>
            </div>
          </div>

          {/* TV Screen Content */}
          <div className="p-3 h-full overflow-hidden bg-console-bg relative">
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-px bg-terminal-green absolute top-0 animate-pulse"></div>
            </div>

            {/* Content display */}
            <div className="space-y-1">
              {content && content.length > 0 ? (
                content.map((line, idx) => (
                  <p
                    key={idx}
                    className="font-mono text-[10px] text-terminal-green-dim leading-tight"
                  >
                    <span className="text-cyber-blue">&gt;</span> {line}
                  </p>
                ))
              ) : (
                <>
                  <p className="font-mono text-[10px] text-terminal-green-dim">
                    <span className="text-cyber-blue">&gt;</span> System ready
                  </p>
                  <p className="font-mono text-[10px] text-terminal-green-dim">
                    <span className="text-cyber-blue">&gt;</span> Click to access
                  </p>
                  <p className="font-mono text-[10px] text-terminal-green animate-pulse">
                    <span className="text-cyber-blue">&gt;</span> {label.toLowerCase()}_data.db
                  </p>
                </>
              )}
            </div>

            {/* CRT effect overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-terminal-green to-transparent opacity-5"></div>
          </div>
        </div>
      </Html>

      {/* Glowing indicator at the base */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial
          color={hovered ? '#00ff41' : '#00d9ff'}
          transparent
          opacity={hovered ? 1 : 0.6}
          emissive={hovered ? '#00ff41' : '#00d9ff'}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
    </group>
  );
}

interface ComputerModelProps {
  onLoad: () => void;
  onMonitorClick: (type: string) => void;
}

function ComputerModel({ onLoad, onMonitorClick }: ComputerModelProps) {
  const { scene } = useGLTF('/assets/compute_for_old_lab.glb');

  useEffect(() => {
    if (scene) {
      // Call onLoad when model is ready
      onLoad();
    }
  }, [scene, onLoad]);

  return (
    <group>
      <primitive
        object={scene}
        scale={1.5}
        position={[0, -1, 0]}
      />

      {/* Interactive Hotspots - Loaded from JSON config */}
      {hotspotsConfig.hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position as [number, number, number]}
          label={hotspot.label}
          onClick={() => onMonitorClick(hotspot.id)}
          size={hotspot.size}
          content={hotspot.content}
        />
      ))}
    </group>
  );
}

function Lighting() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} />

      {/* Terminal green key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#00ff41"
        castShadow
      />

      {/* Cyber blue fill light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.7}
        color="#00d9ff"
      />

      {/* Rim light for depth */}
      <directionalLight
        position={[0, 5, -5]}
        intensity={0.5}
        color="#00ff41"
      />

      {/* Point light for dramatic effect */}
      <pointLight
        position={[0, 3, 2]}
        intensity={1}
        color="#00ff41"
        distance={15}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ff41" wireframe />
    </mesh>
  );
}

interface ControlRoomSceneProps {
  onModelLoaded: () => void;
  onMonitorClick: (type: string) => void;
}

export default function ControlRoomScene({ onModelLoaded, onMonitorClick }: ControlRoomSceneProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        className="bg-deep-black"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />

        {/* Lighting */}
        <Lighting />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* 3D Model */}
        <Suspense fallback={<LoadingFallback />}>
          <ComputerModel onLoad={onModelLoaded} onMonitorClick={onMonitorClick} />
        </Suspense>

        {/* Ground plane with grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.3}
            roughness={0.8}
          />
        </mesh>

        {/* Grid helper for terminal aesthetic */}
        <gridHelper
          args={[30, 30, '#00ff41', '#008822']}
          position={[0, -0.99, 0]}
        />
      </Canvas>

      {/* Instructions Overlay */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-panel-bg/90 border border-terminal-green-dark px-4 py-2 rounded-none pointer-events-none">
        <p className="text-terminal-green-dim font-mono text-xs text-center">
          <span className="text-cyber-blue">Click Hotspots:</span> Open Details •
          <span className="text-cyber-blue"> Left Drag:</span> Rotate •
          <span className="text-cyber-blue"> Right Drag:</span> Pan •
          <span className="text-cyber-blue"> Scroll:</span> Zoom
        </p>
      </div>
    </div>
  );
}
