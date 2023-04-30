import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {Ocean} from "./Ocean"
import Underlay from "./Underlay"
import { useSpring, animated, easings, config } from '@react-spring/three'
import './style.scss'

export default function Flies()
{

   
    return (
        <div className="container" style={{ position: "absolute", top: 0, left: 0 }}>
        {[...Array(100)].map((_, i) => (
            <div key={i} className="circle-container">
            <div className="circle"></div>
            </div>
        ))}
        </div>

    )

}