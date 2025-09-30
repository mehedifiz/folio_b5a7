import React from 'react';

const Footer = () => {
    return (
        <footer className="  py-6">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <div className="text-xl font-bold">
      John Don
    </div>

    <div className="flex space-x-6 mt-4 md:mt-0">
      <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
      <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
      <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
      <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
    </div>

    <div className="mt-4 md:mt-0 text-sm text-gray-400">
      &copy; 2025 John Don. All rights reserved.
    </div>
  </div>
</footer>

    );
};

export default Footer;