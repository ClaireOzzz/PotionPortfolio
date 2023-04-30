
import { useThree, useLoader,useFrame } from "@react-three/fiber";
import { Image, OrbitControls } from "@react-three/drei";
import {useRef, useState} from "react";
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function Underlay({spin, setSpin}) {
  const ref = useRef();

  
  useFrame(() => {
    ref.current.material.zoom = 1.2;
    ref.current.material.grayscale = 0;
  });

  const viewport = useThree((state) => state.viewport);
  const { scene } = useThree();

  const texture = useLoader(TextureLoader, "./purp.jpg");
  texture.encoding = THREE.sRGBEncoding;
  scene.background = texture;

  const texture2 = useLoader(THREE.TextureLoader, "./name.png");


  return (
    <>
      <Image
        ref={ref}
        url="./name.png"
        transparent={true}
        position={[0, viewport.height / 100, 0]}
        scale={
          viewport.width < 10.5
            ? 6
            : viewport.width > 15
            ? 8
            : viewport.width / 1.9
        }
      />

      {/* ABOUT ME BUTTON */}
      <mesh
        position={[-4, 0, 0]}
        onClick={() => setSpin(!spin)}
        scale={[2, 1, 1]}
      >
        <planeGeometry />
        <meshBasicMaterial map={texture2} transparent />
      </mesh>

       {/* ABOUT ME BUTTON */}
      <mesh
        position={[-4, -3, 0]}
        onClick={() => setSpin(!spin)}
        scale={[2, 1, 1]}
      >
        <planeGeometry />
        <meshBasicMaterial map={texture2} transparent />
      </mesh>

      {/* ABOUT ME BUTTON */}
      <mesh
        position={[4, 0, 0]}
        onClick={() => setSpin(!spin)}
        scale={[2, 1, 1]}
      >
        <planeGeometry />
        <meshBasicMaterial map={texture2} transparent />
      </mesh>

       {/* ABOUT ME BUTTON */}
      <mesh
        position={[4, -3, 0]}
        onClick={() => setSpin(!spin)}
        scale={[2, 1, 1]}
      >
        <planeGeometry />
        <meshBasicMaterial map={texture2} transparent />
      </mesh>

    </>
  );
}
