import React from 'react';
import logo from './assets/white-logo.png';

function Footer() {
  return (
    <footer className="bg-[#03347d] text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between max-w-[95%] md:max-w-[80%]">
        {/* Left Side: Logo and Slogan */}
        <div className="flex flex-col mb-6 md:mb-0">
          <div className=' p-2 w-24 rounded-sm mb-2'>
            
            <img
              src={logo}
              alt="Logo"
              className="w-full h-auto"
            />
          </div>
          
          <p className="text-[12px] font-thin text-white max-w-80 text-justify">
          At Mente Soin, we understand the challenges faced by you in today’s fast-paced world. Our mission is to provide accessible, personalized, and evidence-based mental health solutions that empower you to reach your full potential while maintaining optimal psychological well-being.
          </p>
        </div>

        {/* Right Side: Quick Links and Contact Us */}
        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* Quick Links Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="https://harmoniemente.com" className="hover:text-gray-300 text-[12px]">Home</a></li>
              <li><a href="https://harmoniemente.com/about-us/" className="hover:text-gray-300 text-[12px]">About Us</a></li>
              <li><a href="https://harmoniemente.com/team/" className="hover:text-gray-300 text-[12px]">Our Team</a></li>
              <li><a href="https://harmoniemente.com/contact" className="hover:text-gray-300 text-[12px]">Contact</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-[12px] mb-2">sims avenue centre sims avenue ,<br/> singapore 387603</p>
            <p className="text-[12px] mb-2">Head office : 275 New N Rd ,<br/>  Suite 1477 , London , N17AA United kingdom</p>
            <p className="text-[12px]">2082 yonge street Toranto,<br/> ONM4P 2H5 canada</p>
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-white pt-4 text-center text-sm">
        © 2024 Mente Soin. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
