import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br-2 shadow-4" options={{ max: 25 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner center"> Enneas </div>
            </Tilt>
        </div>
    )
}

export default Logo
