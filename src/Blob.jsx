// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// import { useLayoutEffect, useRef, useState, useMemo } from "react";
// import perlin3 from './perlin'
// import { Sphere } from "three";

import React, { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { DistortTorusMaterial } from "./DistortTorusMaterial";

RectAreaLightUniformsLib.init();

export default function Blob() { 
  const ref = useRef();
  const RADIUS = 1;
  const { size } = useThree();
  return (
    <>
      <Sphere ref={ref} args={[RADIUS, 500, 100]}>
        <DistortTorusMaterial
          color="white"
          metalness={0.1}
          roughness={1}
          clearcoat={0.1}
          radius={RADIUS}
          resolution={[size.width, size.height]}
        />
      </Sphere>
    </>
  );
}

