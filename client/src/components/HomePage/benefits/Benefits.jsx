import React from 'react';
import { FiClock, FiDollarSign, FiCloud, FiShield, FiHeadphones, FiTrendingUp } from 'react-icons/fi';

const Benefits = () => {
  const benefits = [
    {
      icon: <FiClock className="text-blue-600 text-2xl" />,
      title: "Save Time",
      description: "Automate repetitive tasks and focus on strategic HR initiatives"
    },
    {
      icon: <FiDollarSign className="text-blue-600 text-2xl" />,
      title: "Reduce Costs",
      description: "Eliminate paperwork and reduce administrative overhead"
    },
    {
      icon: <FiCloud className="text-blue-600 text-2xl" />,
      title: "Cloud Access",
      description: "Access your HR data anytime, anywhere from any device"
    },
    {
      icon: <FiShield className="text-blue-600 text-2xl" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and regular security audits"
    },
    {
      icon: <FiHeadphones className="text-blue-600 text-2xl" />,
      title: "Dedicated Support",
      description: "24/7 customer support with HR experts"
    },
    {
      icon: <FiTrendingUp className="text-blue-600 text-2xl" />,
      title: "Scalable Solution",
      description: "Grows with your business from 10 to 10,000+ employees"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our HR System</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Designed to transform how you manage your most valuable asset - your people
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">{benefit.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;