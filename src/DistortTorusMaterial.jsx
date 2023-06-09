import * as THREE from "three";
import React, { useState } from "react";
import { MeshPhysicalMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { distort } from "./distort";

class DistortMaterialImpl extends MeshPhysicalMaterial {
  _time;
  _radius;
  _resolution;

  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = { value: 0 };
    this._radius = { value: 1 };
    this._resolution = { value: new THREE.Vector2() };
  }

  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.radius = this._radius;

    shader.vertexShader = `
      uniform float distort;
      uniform float radius;
      uniform float time;
      varying vec3 myTrasformed;
      ${distort}

      float fsnoise(float val1, float val2, float val3){
        return snoise(vec3(val1,val2,val3));
      }

      vec3 distortFunct(vec3 transformed, float factor) {
        float radiusVariationAmplitude = 1.2;
        float radiusNoiseFrequency = 0.6;
        
        // To be continious, the noise needs to be **based** on the torus position, not the circle, not the sphere.
        // But, the result of the noise is applied to the sphere
        float radiusVariation = -fsnoise(
          transformed.x * radiusNoiseFrequency + time,
          transformed.y * radiusNoiseFrequency + time,
          transformed.z * radiusNoiseFrequency + time 
        ) * radiusVariationAmplitude * factor;

        // Add the noise to the sphere and put everything back together.
        return normalize(transformed) * (radiusVariation + radius);
      }

      vec3 orthogonal(vec3 v) {
        return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
        : vec3(0.0, -v.z, v.y));
      }

      vec3 distortNormal(vec3 position, vec3 distortedPosition, vec3 normal){
        vec3 tangent1 = orthogonal(normal);
        vec3 tangent2 = normalize(cross(normal, tangent1));
        vec3 nearby1 = position + tangent1 * 0.1;
        vec3 nearby2 = position + tangent2 * 0.1;
        vec3 distorted1 = distortFunct(nearby1, 1.0);
        vec3 distorted2 = distortFunct(nearby2, 1.0);
        return normalize(cross(distorted1 - distortedPosition, distorted2 - distortedPosition));
      }
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <project_vertex>",
      `
        #include <project_vertex>

        vec4 myWorldPosition = modelMatrix * vec4(position, 1.0);
        float updateTime = time / 10.0;
        float scaleFactor = snoise(vec3(position.xyz / 50.0 + updateTime * 2.0));
        transformed = distortFunct(transformed, scaleFactor);
        myTrasformed = transformed;
        vec3 distortedNormal = distortNormal(position, transformed, normal);
        vNormal = normal + scaleFactor * distortedNormal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed,1.);
        `
    );

    shader.fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      uniform float radius;
      varying vec3 myTrasformed;

      ${distort}
      ${shader.fragmentShader}
    `;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <lights_physical_fragment>",
      `
      float factor = (length(myTrasformed) - radius);
      roughnessFactor *= factor;
      metalnessFactor *= 1.0 - factor;
      #include <lights_physical_fragment>
      material.clearcoat *= (1.0 - factor) * material.clearcoat;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
      #include <dithering_fragment>
      gl_FragColor = vec4(gl_FragColor.rgb + factor, gl_FragColor.a);
      `
    );
  }

  get time() {
    return this._time.value;
  }

  set time(v) {
    this._time.value = v;
  }

  get radius() {
    return this._radius.value;
  }

  set radius(v) {
    this._radius.value = v;
  }

  get resolution() {
    return this._resolution.value;
  }

  set resolution(v) {
    this._resolution.value = v;
  }
}

export const DistortTorusMaterial = React.forwardRef(
  ({ speed = 1, ...props }, ref) => {
    const [material] = useState(() => new DistortMaterialImpl(), []);
    useFrame((state) => {
      if (material) {
        material.time = state.clock.getElapsedTime() * speed;
      }
    });
    return (
      <primitive object={material} ref={ref} attach="material" {...props} />
    );
  }
);
