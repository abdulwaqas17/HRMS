import React from 'react';
import { FiLogIn } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-800">HRPro</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Pricing</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <FiLogIn />
          <span>Login</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;