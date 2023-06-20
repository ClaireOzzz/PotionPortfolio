import { Float, OrbitControls, Environment, Sphere } from "@react-three/drei";
import { useThree, useLoader } from "@react-three/fiber";
import React, {useRef, useState} from "react";
import { Perf } from 'r3f-perf'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {Ocean} from "./Ocean"
import Underlay from "./Underlay"
import { useSpring, animated, easings, config } from '@react-spring/three'
import Blob from "./Blob";
import Tendrils from "./Tendrils";

export default function App()
{
    const [spin, setSpin] = useState(false);
    const [splat, setSplat] = useState(false);
    const myMesh = useRef()
  
    const ref = useRef();
    const { size } = useThree();
  
    const model = useLoader(GLTFLoader, "./cauldron.glb")
    
    const viewport = useThree(state => state.viewport)
    //console.log("viewport.width", viewport.width)

    //SPIN ANIMATION : ABOUT ME BUTTON
    const { rotationAngle } = useSpring({ rotationAngle: spin ? 2*Math.PI : 1,  config: {
        easing: easings.easeInBounce,
      },})

    const { positioned } = useSpring({ positioned: splat ? 1.5 : -1 ,  config: {
        duration: 3000,
        friction: 5
      },})
   

    return (
        <>
        <Environment preset="warehouse" blur={1} />

        <Perf position="top-left" />
        <OrbitControls makeDefault />
        <Underlay 
        spin={spin} setSpin={setSpin} 
        splat={splat} setSplat={setSplat}
         />

        {/* LIGHTS     */}
        <directionalLight position={[1, 0, 3]} color={'grey'} intensity={15} />
        <ambientLight color={'grey'} intensity={10.5} />

        <Float
            rotationIntensity={0.2}
            floatIntensity={1}
            floatingRange={[-0.2, 0.2]}
        >
            <animated.primitive
            ref={myMesh}
            object={model.scene}

            rotation-x={Math.PI*0.15}
            rotation-y={rotationAngle}

            position={[0, -1.2, -1]}
            scale={
                viewport.width < 5
                ? 1.0
                : viewport.width > 15
                ? 2
                : viewport.width / 10
            }
            />
            
        </Float>

        {/* <animated.mesh position-y={positioned}>
            <Blob/>
        </animated.mesh> */}

        <Tendrils />
        
        </>
     
    );
}