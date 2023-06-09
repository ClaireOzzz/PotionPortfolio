
import './portal.css'

export default function Portal()
{
    return (
        <body>
            <div className="circle"></div>
            
            <svg>
                <filter id="wavy">
                <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" seed="2">
                    <animate attributeName="baseFrequency" dur="60s" values="0.02;0.005;0.02" repeatCount="indefinite"></animate>
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
                </filter>
            </svg>
        </body>
    )

}