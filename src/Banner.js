import React from 'react'
import banner from './assets/banner.jpeg'

function Banner() {
  return (
    <div 
      className="relative bg-cover h-60 bg-no-repeat bg-center" 
      style={{ backgroundImage: `url(${banner})` }}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      
      {/* Text */}
      <div className="flex items-center justify-center w-full h-full">
      <div className="text-[22px] z-20 text-xl md:text-3xl tracking-wide text-center text-[#ffffff] font-semibold">
      <p>Harmonie Mente Soin Workshop Registration Form</p>
     
        </div>
   
      </div>
    </div>
  )
}

export default Banner


