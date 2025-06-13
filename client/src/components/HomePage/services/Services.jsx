import React from 'react';
import { FiUser, FiCalendar, FiDollarSign, FiPieChart, FiAward, FiDatabase } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <FiUser className="text-blue-600 text-3xl mb-4" />,
      title: "Employee Management",
      description: "Centralized employee records with all necessary information in one place"
    },
    {
      icon: <FiCalendar className="text-blue-600 text-3xl mb-4" />,
      title: "Attendance Tracking",
      description: "Automated time tracking with geolocation and biometric integration"
    },
    {
      icon: <FiDollarSign className="text-blue-600 text-3xl mb-4" />,
      title: "Payroll Processing",
      description: "Automated salary calculations with tax deductions and payment integration"
    },
    {
      icon: <FiPieChart className="text-blue-600 text-3xl mb-4" />,
      title: "Analytics Dashboard",
      description: "Real-time insights into workforce metrics and performance indicators"
    },
    {
      icon: <FiAward className="text-blue-600 text-3xl mb-4" />,
      title: "Performance Reviews",
      description: "Streamlined evaluation process with customizable review templates"
    },
    {
      icon: <FiDatabase className="text-blue-600 text-3xl mb-4" />,
      title: "Document Management",
      description: "Secure storage and easy access to all employee documents"
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Comprehensive Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your human resources efficiently in one platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;