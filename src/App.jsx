import { Float, OrbitControls } from "@react-three/drei";
import { useThree, useLoader } from "@react-three/fiber";
import {useRef, useState} from "react";
import { Perf } from 'r3f-perf'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {Ocean} from "./Ocean"
import Underlay from "./Underlay"
import { useSpring, animated, easings, config } from '@react-spring/three'

export default function App()
{

    const [spin, setSpin] = useState(false);
    const myMesh = useRef()

    const model = useLoader(GLTFLoader, "./cauldron.glb")
    
    const viewport = useThree(state => state.viewport)
    // console.log("viewport.width", viewport.width)

    // SPIN ANIMATION : ABOUT ME BUTTON
    const { rotationAngle } = useSpring({ rotationAngle: spin ? 2*Math.PI : 1,  config: {
        // mass: 1,
        // friction: 5,
        easing: easings.easeInBounce,
      },})

    return (
        <>
        <Perf position="top-left" />
        <OrbitControls makeDefault />
        <Underlay spin={spin} setSpin={setSpin}
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

            rotation-x={Math.PI*0.1}
            rotation-y={rotationAngle}

            position={[0, -3.4, 0]}
            scale={
                viewport.width < 10.5
                ? 1.3
                : viewport.width > 15
                ? 2
                : viewport.width / 8
            }
            />
        </Float>
       
        </>
    );
}