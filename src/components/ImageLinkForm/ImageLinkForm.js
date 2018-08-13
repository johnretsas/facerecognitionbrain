import React, { Component } from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    {
        return (
            <div>
                <p className='f3 center'>
                    {'This Magic Brain will detect faces in your pictures. Git it a try'}
                </p>
                <div className='center w-50 pa4 br3 shadow-5 pattern' >
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button 
                    className='w-30 grow f4 link ph3 pv2 dib white button bg-light-purple'
                    onClick = {onButtonSubmit} >
                     Detect </button>
                </div>
            </div>
        )
    }
}

export default ImageLinkForm
