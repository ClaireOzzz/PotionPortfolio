import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Water } from "three/examples/jsm/objects/Water.js";

extend({ Water });

export function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader, "Group-7.jpeg"
  );


  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.CircleGeometry(1.7, 32), []);
  const config = useMemo(
    () => ({
      textureWidth: 202,
      textureHeight: 202,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0x000000,
      waterColor: 0xc9c8c3, //23cf2c green
      distortionScale: 10,
      fog: true,
      format: gl.encoding,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waterNormals]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta/10)
  );
  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2.6}
      position={[0, -0.9, 0.8]}
    />
  );
}

