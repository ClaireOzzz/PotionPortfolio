import { Float, OrbitControls } from "@react-three/drei";
import { useThree, useLoader } from "@react-three/fiber";
import {useRef} from "react";
import { Perf } from 'r3f-perf'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {Ocean} from "./Ocean"
import Underlay from "./Underlay"

export default function App()
{
    const sphere = useRef()
    const cube = useRef()

    const model = useLoader(GLTFLoader, "./ironCauldron3.glb")
    // const { viewport } = useThree()
    const viewport = useThree(state => state.viewport)
    console.log("viewport.width", viewport.width)

    return <>
        <Underlay />
        <Perf position="top-left" />
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 5.5 } />
        <ambientLight intensity={ 10.5 } />
       

        <Float
        // rotationIntensity={0.2}
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.2, 0.2]}
        >
        <primitive object={model.scene} rotation={[Math.PI*0.1,0,0]} position={[0,-3.4,0]} 
        scale={viewport.width < 10.5 ? 1.3 : (viewport.width > 15 ? 2 : viewport.width / 8)}
        />     
        {/* <Ocean />  */}
        </Float>
      
    </>
}