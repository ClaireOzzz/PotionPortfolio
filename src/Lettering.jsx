
import React from 'react';
import ReactCurvedText from "react-curved-text";
import './lettering.css'

export default function Lettering()
{
    const  textPath = `<textPath xlinkHref="#curve">
          this is a test - this is a test
        </textPath>`;
        
    // return (
    //     <div className="logo-container">
    //         <span >AAAAAAAAAA</span>
    //         <svg viewBox="0 0 100 100">
    //             <path id="curve" d="
    //                 M 25, 50
    //                 a 25,25 0 1,1 50,0
    //                 a 25,25 0 1,1 -50,0
    //             "
    //             />
    //             <text width="100">
    //                 <textPath href="#curve">look out for the curves around .</textPath>
    //             </text>
    //         </svg>
    //     </div>

    // )
    return (
        <div className="logo-container">
            <span >AAAAAAAAAA</span>
            <ReactCurvedText
            width={370}
            height={300}
            cx={190}
            cy={120}
            rx={100}
            ry={100}
            startOffset={100}
            text="curved text"
            />
        </div>
      );
};
