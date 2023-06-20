// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// import { useLayoutEffect, useRef, useState, useMemo } from "react";
// import perlin3 from './perlin'
// import { Sphere } from "three";

import React, { useRef } from "react";
import {  useThree } from "@react-three/fiber";
import { Sphere, TorusKnot } from "@react-three/drei";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { DistortTorusMaterial } from "./DistortTorusMaterial";

RectAreaLightUniformsLib.init();

export default function Blob() { 
  const ref = useRef();
  const { size } = useThree();


  return (
    <>
      <Sphere ref={ref} args={[1, 600, 100]} position={[0,0,-1]} >
        <DistortTorusMaterial
          color="white"
          metalness={0.1}
          roughness={1}
          clearcoat={0.1}
          radius={1}
          resolution={[size.width, size.height]}
        />
      </Sphere>
    </>
  );
}

