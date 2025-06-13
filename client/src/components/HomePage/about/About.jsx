import React from 'react';
import { FiUsers, FiClock, FiShield, FiBarChart2 } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiUsers className="text-blue-600 text-3xl" />,
      title: "Employee Management",
      desc: "Centralized employee database with all necessary information"
    },
    {
      icon: <FiClock className="text-blue-600 text-3xl" />,
      title: "Time Tracking",
      desc: "Efficient attendance and leave management system"
    },
    {
      icon: <FiShield className="text-blue-600 text-3xl" />,
      title: "Data Security",
      desc: "Enterprise-grade security for your sensitive HR data"
    },
    {
      icon: <FiBarChart2 className="text-blue-600 text-3xl" />,
      title: "Analytics",
      desc: "Powerful insights into your workforce metrics"
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About Our HR System</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;