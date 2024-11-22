import React from 'react'
import logo from './assets/white-logo.png';

function Header() {
  const handleLogoClick = () => {
    // Use window.location to navigate to an external URL
    window.location.href = 'https://harmoniemente.com';
  };

  return (
    <div>
      <div className="bg-[#512cad] py-2 px-5 items-center w-full">
        <div className="flex justify-between max-w-[95%] md:max-w-[80%] mx-auto">
          <img
            src={logo}
            alt="logo"
            className="w-12 hover:animate-pulse cursor-pointer"
            onClick={handleLogoClick} // Calling handleLogoClick on logo click
          />
          <h1 onClick={handleLogoClick} // Calling handleLogoClick on logo click 
          className="text-[20px] cursor-pointer hover:transition-all hover:translate-y-1 hover:animate-pulse my-3 text-xl md:text-2xl tracking-wide text-center text-white font-semibold">
            Harmonie-Mente
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
