import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'
import Portal from './Portal.jsx'
import Card from './Card.jsx'
import Background from './Background.jsx'
import Lettering from './Lettering'
import ReactCurvedText from "react-curved-text";

const created =({ scene }) => {
  console.log("whr tf is it", scene)
  // const texture = useLoader(TextureLoader, "/bg.png");
  // scene.background = texture;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  {/* <Background /> */}

  {/* <Canvas shadows
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
    </Canvas> */}

    {/* <Flies /> */}
    {/* <Portal/> */}
    {/* <Card /> */}
    {/* <Lettering /> */}
    <div className="logo-container">
        {/* <span >AAAAAAAAAA</span> */}
        <ReactCurvedText
            width={300}
            height={300}
            cx={150}
            cy={150}
            rx={100}
            ry={100}
            startOffset={50}
            reversed={false}
            text="react-curved-text"
            textProps={{ style: { fontSize: 24 } }}
           
        />
    </div>
    
  </React.StrictMode>

)
