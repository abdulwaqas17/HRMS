import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    quote: "This HR system transformed how we manage our 500+ employees. The payroll automation alone saved us 20 hours per month.",
    name: "Ahmed Khan",
    position: "CEO, TechSolutions PK",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "Implementation was seamless and our HR team was up and running in just 2 days. The customer support is exceptional.",
    name: "Fatima Ahmed",
    position: "HR Director, MediCare Ltd",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "The analytics dashboard gives us insights we never had before. We've improved retention by 15% since implementation.",
    name: "Bilal Hassan",
    position: "Operations Manager, RetailCorp",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by companies across various industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-blue-400 mb-4">
                <FaQuoteLeft className="text-2xl" />
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;