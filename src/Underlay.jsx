
import { useThree, useLoader,useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import {useRef} from "react";
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function Underlay()
{
    const ref = useRef()
    useFrame(() => {
      ref.current.material.zoom = 1.2 // 1 and higher
      ref.current.material.grayscale = 0 // between 0 and 1
    })
    const viewport = useThree(state => state.viewport)
   
    const { scene } = useThree();
 
    const texture = useLoader(TextureLoader, "./purp.jpg");
    texture.encoding = THREE.sRGBEncoding
    scene.background = texture;

    const texture2 = useLoader(THREE.TextureLoader,"./name.png");

    return <>
       <Image ref={ref} url="./name.png"  transparent={true} 
       position={[0,(viewport.height/100)*1,0]} 
      //  scale={viewport.width/1.5}
       scale={viewport.width < 10.5 ? 6 : (viewport.width > 15 ? 8 : viewport.width / 1.9)}
       />
      {/* <mesh position={[0,0,0]} scale={size} >
          <planeGeometry  />
          <meshBasicMaterial map={texture2} transparent={true} />
      </mesh>  */}
        

    </>
}