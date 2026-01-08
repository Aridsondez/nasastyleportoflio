'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export default function CharacterModel({
  position = [2, -1, 0],
  scale = 0.1,
  rotation = [0, Math.PI / 4, 0]
}: CharacterModelProps) {
  const fbx = useFBX('/assets/Bored.fbx');
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (fbx && fbx.animations && fbx.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(fbx);
      mixerRef.current = mixer;

      const action = mixer.clipAction(fbx.animations[0]);
      action.play();

      // Traverse the model and fix any emissive materials
      fbx.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            // Handle both single material and array of materials
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

            materials.forEach((mat) => {
              const material = mat as THREE.MeshStandardMaterial;

              // Remove emissive lighting if present
              if (material.emissive) {
                material.emissive.setHex(0x000000);
                material.emissiveIntensity = 0;
              }

              // Ensure proper lighting response
              material.needsUpdate = true;
            });
          }
        }
      });

      return () => {
        mixer.stopAllAction();
      };
    }
  }, [fbx]);

  // Update animation mixer on each frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <primitive
      object={fbx}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

// Preload the FBX file for better performance
useFBX.preload('/assets/Bored.fbx');
