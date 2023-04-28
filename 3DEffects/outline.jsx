// import { useState, useRef } from 'react'
// import './App.css'
// import { useFrame, extend, useThree } from '@react-three/fiber'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { EffectComposer, Selection, Select, Outline, Pixelation } from "@react-three/postprocessing"

// extend({ OrbitControls })

// export default function App() 
// {
//   const [enabled, setEnabled] = useState(true)
//   const { camera, gl } = useThree()
//   const cubeRef = useRef()
//   const groupRef = useRef()

//   useFrame((state, delta) => {

//     cubeRef.current.rotation.y += delta

//   })

//   return (
//     <>
//       <orbitControls args={ [ camera, gl.domElement ] } />

//       <directionalLight position={[1,2,3]} intensity={1.5} castShadow/>
//       <ambientLight intensity={0.5} />

//       <Selection>
//         <EffectComposer enabled={enabled} autoClear={false}>
//           <Outline visibleEdgeColor="white" hiddenEdgeColor="white" edgeStrength={2}  />
//         </EffectComposer>
//         <Select enabled>
//           <group>
//             <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25} castShadow>
//               <torusGeometry />
//               <meshStandardMaterial color="mediumpurple" />
//             </mesh>
//           </group>
//         </Select>
//       </Selection>
  
//     </>
//   )
// }


