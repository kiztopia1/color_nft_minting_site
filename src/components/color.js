import React from 'react'
import './color.css'
function ColorBox({name}) {
  return (
    <div className='color' style={{background: name}}>name</div>
  )
}

export default ColorBox