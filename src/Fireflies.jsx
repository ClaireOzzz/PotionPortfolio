
import './fireflies.scss'

export default function Flies()
{

    return (
       
        <div className="container" style={{ position: "absolute"}}>
        {[...Array(100)].map((_, i) => (
            <div key={i} className="circle-container">
            <div className="circle"></div>
            </div>
        ))}
        </div>
    
    )

}