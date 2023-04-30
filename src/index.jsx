import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.scss'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'
import Flies from './Fireflies.jsx'
import Portal from './Portal.jsx'

const created =({ scene }) => {
  console.log("whr tf is it", scene)
  // const texture = useLoader(TextureLoader, "/bg.png");
  // scene.background = texture;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  

  <Canvas shadows
        background={ null }
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 0, 11 ]
        } }
        onCreated={ created }
    >
        <App />
    </Canvas>
    {/* <Flies /> */}
    <Portal/>
  </React.StrictMode>

)
