import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Modern HR Management <span className="text-blue-600">Solution</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Streamline your HR operations with our all-in-one platform designed for companies of all sizes.
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
     <img
  src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg"
  alt="HR Dashboard"
  className="w-full h-auto"
/>
        </div>
      </div>
    </section>
  );
};

export default Hero;