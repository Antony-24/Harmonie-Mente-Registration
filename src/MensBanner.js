import React from 'react'
import banner from './assets/banner.jpeg'

function MensBanner() {
  return (
    <div 
      className="relative bg-cover h-60 bg-no-repeat bg-center" 
      style={{ backgroundImage: `url(${banner})` }}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      
      {/* Text */}
      <div className="flex items-center justify-center w-full h-full">
      <div className="w-[95%] md:w-[80%] mx-auto z-20 text-xl md:text-3xl tracking-wide text-center text-[#ffffff] font-semibold">
      
      <div className='bg-black/30 backdrop-blur-sm w-full py-4'>
      <p className='text-sm'>Welcome to</p>
      <p className='text-xl'>Harmonie Mente Soin’s Working Professionals Men's Support Group.</p>
      {/* <p className='text-sm tracking-wide'>Start Date: January 11, 2024, at 10 AM EST (Alternate Saturdays)</p> */}
      </div>
        </div>
   
        </div>
    </div>
  )
}

export default MensBanner


