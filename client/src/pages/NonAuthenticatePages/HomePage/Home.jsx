// import React, { useState } from 'react';

// // --- Common Components (Embedded) ---

// const SectionHeading = ({ title }) => {
//   return (
//     <div className="text-center mb-16">
//       <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
//         {title}
//       </h2>
//       <div className="h-1 w-24 bg-indigo-600 mx-auto mt-4 rounded"></div>
//     </div>
//   );
// };

// const Button = ({ text, onClick, type = 'button', className = '' }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out ${className}`}
//     >
//       {text}
//     </button>
//   );
// };

// const InputField = ({ label, type, name, value, onChange, placeholder, required = false }) => {
//   return (
//     <div className="mb-6">
//       <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
//       />
//     </div>
//   );
// };

// // --- Layout Components (Embedded) ---

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <a href="#" className="flex-shrink-0 text-2xl font-bold text-indigo-600">
//               HRMS Pro
//             </a>
//           </div>
//           <div className="hidden md:flex md:items-center md:space-x-8">
//             <a href="#about" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">About Us</a>
//             <a href="#services" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Services</a>
//             <a href="#benefits" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Benefits</a>
//             {/* <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Testimonials</a> */}
//             <a href="#contact" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Contact Us</a>
//             <a href="#register" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Register Company</a>
//           </div>
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a href="#about" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">About Us</a>
//             <a href="#services" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Services</a>
//             <a href="#benefits" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Benefits</a>
//             {/* <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Testimonials</a> */}
//             <a href="#contact" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
//             <a href="#register" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Register Company</a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//         <div className="mb-4 md:mb-0">
//           <p>&copy; {new Date().getFullYear()} HRMS Pro. All rights reserved.</p>
//           <p className="text-sm mt-1">Building better HR solutions, together.</p>
//         </div>
//         <div className="flex space-x-6">
//           {/* Add social media links/icons here */}
//           <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
//           <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
//           <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // --- Section Components (Embedded) ---

// const Hero = () => {
//   return (
//     <section className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white py-20 px-4 sm:px-6 lg:px-8 text-center" id="hero">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
//           Streamline Your HR, Empower Your Workforce.
//         </h1>
//         <p className="text-lg sm:text-xl mb-10 opacity-90">
//           Comprehensive HR Management Solutions designed to elevate your business operations and foster growth.
//         </p>
//         <Button
//           text="Get Started Today"
//           onClick={() => window.location.href = '#contact'}
//           className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
//         />
//       </div>
//     </section>
//   );
// };

// const AboutUs = () => {
//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="about">
//       <div className="max-w-7xl mx-auto">
//         <SectionHeading title="About Our HRMS System" />
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div>
//             <p className="text-gray-700 text-lg leading-relaxed mb-6">
//               Our HR Management System is a cutting-edge platform designed to simplify complex HR processes,
//               from recruitment and onboarding to payroll and performance management. We empower businesses
//               of all sizes to manage their human capital efficiently and effectively.
//             </p>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               Built with scalability and user-friendliness in mind, our HRMS helps you focus on what truly matters:
//               your people. We believe that a well-managed workforce is the cornerstone of a successful organization.
//             </p>
//           </div>
//           <div className="flex justify-center">
//             {/* You can add an image or illustration here */}
//             <img src="https://via.placeholder.com/600x400?text=HRMS+Illustration" alt="HRMS System Illustration" className="max-w-full h-auto rounded-lg shadow-md" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Services = () => {
//   const servicesList = [
//     { name: 'Recruitment & Onboarding', description: 'Attract, hire, and seamlessly onboard top talent with integrated tools.' },
//     { name: 'Payroll & Compensation', description: 'Automate payroll, manage benefits, and ensure compliance with ease.' },
//     { name: 'Performance Management', description: 'Set goals, track progress, and conduct appraisals for continuous growth.' },
//     { name: 'Time & Attendance', description: 'Monitor employee hours, manage leaves, and optimize workforce scheduling.' },
//     { name: 'Employee Self-Service', description: 'Empower employees to access data, apply for leave, and update info.' },
//     { name: 'HR Analytics & Reporting', description: 'Gain valuable insights with comprehensive HR data and custom reports.' },
//   ];

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="services">
//       <div className="max-w-7xl mx-auto">
//         <SectionHeading title="Our Comprehensive HR Services" />
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {servicesList.map((service, index) => (
//             <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <h3 className="text-2xl font-semibold text-indigo-700 mb-4">{service.name}</h3>
//               <p className="text-gray-600 text-lg">{service.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const Benefits = () => {
//   const benefitsList = [
//     { title: 'Increased Efficiency', description: 'Automate routine tasks, reduce manual errors, and free up HR time.' },
//     { title: 'Cost Savings', description: 'Minimize administrative overhead and optimize resource allocation.' },
//     { title: 'Improved Compliance', description: 'Stay up-to-date with labor laws and regulations effortlessly.' },
//     { title: 'Enhanced Employee Experience', description: 'Boost engagement and satisfaction with self-service options.' },
//     { title: 'Data-Driven Decisions', description: 'Access insightful analytics for strategic HR planning.' },
//     { title: 'Scalability & Flexibility', description: 'Grow your HR operations without limits, adapting to your needs.' },
//   ];

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="benefits">
//       <div className="max-w-7xl mx-auto">
//         <SectionHeading title="Why Choose Our HRMS?" />
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {benefitsList.map((benefit, index) => (
//             <div key={index} className="flex items-start bg-white p-6 rounded-lg shadow-md">
//               <div className="flex-shrink-0 mr-4">
//                 {/* You can use an icon here, e.g., from Heroicons */}
//                 <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
//                 <p className="text-gray-600">{benefit.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const Testimonials = () => {
//   const testimonialsData = [
//     {
//       quote: "Our HR processes have been completely transformed. The system is intuitive and incredibly efficient!",
//       author: "Jane Doe",
//       company: "Tech Solutions Inc."
//     },
//     {
//       quote: "Excellent support and a truly comprehensive HRMS. It's made our HR department so much more productive.",
//       author: "John Smith",
//       company: "Global Logistics"
//     },
//     {
//       quote: "A game-changer for our small business. The onboarding process was smooth, and features are robust.",
//       author: "Emily White",
//       company: "Creative Agency"
//     }
//   ];

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="testimonials">
//       <div className="max-w-7xl mx-auto">
//         <SectionHeading title="What Our Clients Say" />
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonialsData.map((testimonial, index) => (
//             <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
//               <p className="text-gray-700 text-lg italic mb-6">"{testimonial.quote}"</p>
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 mr-4">
//                   {/* You can add author's avatar here */}
//                   <img src={`https://via.placeholder.com/60?text=${testimonial.author.charAt(0)}`} alt={testimonial.author} className="h-12 w-12 rounded-full object-cover" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800">{testimonial.author}</p>
//                   <p className="text-gray-600 text-sm">{testimonial.company}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Contact form submitted:', formData);
//     // In a real app, you would send this data to a backend API
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
//   };

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" id="contact">
//       <div className="max-w-7xl mx-auto">
//         <SectionHeading title="Contact Us" />
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
//           <div>
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h3>
//             <p className="text-gray-700 mb-4">Have questions about our HRMS or need assistance? Reach out to us directly.</p>
//             <div className="mb-4">
//               <h4 className="font-medium text-gray-700">Phone:</h4>
//               <p className="text-gray-600">+1 (123) 456-7890</p>
//             </div>
//             <div className="mb-4">
//               <h4 className="font-medium text-gray-700">Email:</h4>
//               <p className="text-gray-600">info@hrmspro.com</p>
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-700">Address:</h4>
//               <p className="text-gray-600">123 HR Solutions Lane, Business City, State, 12345</p>
//             </div>
//           </div>
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
//             <form onSubmit={handleSubmit}>
//               <InputField
//                 label="Your Name"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <InputField
//                 label="Your Email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <InputField
//                 label="Subject"
//                 type="text"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//               />
//               <div className="mb-6">
//                 <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="5"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
//                   placeholder="Your message"
//                   required
//                 ></textarea>
//               </div>
//               <Button
//                 type="submit"
//                 text="Send Message"
//                 className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md font-semibold transition duration-300 w-full"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const CompanyRegistration = () => {
//   const [formData, setFormData] = useState({
//     companyName: '',
//     industry: '',
//     employees: '',
//     contactPerson: '',
//     contactEmail: '',
//     contactPhone: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Company registration form submitted:', formData);
//     // In a real app, you would send this data to a backend API
//     alert('Thank you for your registration request! We will contact you shortly to set up your account.');
//     setFormData({ companyName: '', industry: '', employees: '', contactPerson: '', contactEmail: '', contactPhone: '', message: '' }); // Clear form
//   };

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="register">
//       <div className="max-w-4xl mx-auto">
//         <SectionHeading title="Company Registration Request" />
//         <p className="text-center text-gray-700 text-lg mb-12">
//           Ready to transform your HR operations? Fill out the form below to request a demo or register your company.
//         </p>
//         <div className="bg-gray-50 p-8 rounded-lg shadow-md">
//           <form onSubmit={handleSubmit}>
//             <InputField
//               label="Company Name"
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               label="Industry"
//               type="text"
//               name="industry"
//               value={formData.industry}
//               onChange={handleChange}
//               placeholder="e.g., Technology, Manufacturing, Retail"
//               required
//             />
//             <InputField
//               label="Number of Employees"
//               type="number"
//               name="employees"
//               value={formData.employees}
//               onChange={handleChange}
//               placeholder="e.g., 50, 200, 1000+"
//               required
//             />
//             <InputField
//               label="Contact Person Name"
//               type="text"
//               name="contactPerson"
//               value={formData.contactPerson}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               label="Contact Person Email"
//               type="email"
//               name="contactEmail"
//               value={formData.contactEmail}
//               onChange={handleChange}
//               required
//             />
//             <InputField
//               label="Contact Person Phone"
//               type="tel"
//               name="contactPhone"
//               value={formData.contactPhone}
//               onChange={handleChange}
//               placeholder="e.g., +11234567890"
//             />
//             <div className="mb-6">
//               <label htmlFor="regMessage" className="block text-gray-700 text-sm font-bold mb-2">Additional Message (Optional)</label>
//               <textarea
//                 id="regMessage"
//                 name="message"
//                 rows="4"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
//                 placeholder="Tell us about your HR needs or specific requirements..."
//               ></textarea>
//             </div>
//             <Button
//               type="submit"
//               text="Request Registration"
//               className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md font-semibold transition duration-300 w-full"
//             />
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// // --- Main App Component ---

// function Home() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow">
//         <Hero />
//         <AboutUs />
//         <Services />
//         <Benefits />
//         <Testimonials /> {/* Uncommented Testimonials for preview */}
//         <ContactUs />
//         <CompanyRegistration />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Home;

import React from 'react';
// import Navbar from '@/components/HomePage/navbar';
import Navbar from '../../../components/HomePage/navbar/Navbar';
import Hero from '../../../components/HomePage/hero/Hero';
import About from '../../../components/HomePage/about/About';
import Services from '../../../components/HomePage/services/Services';
import Benefits from '../../../components/HomePage/benefits/Benefits';
import Testimonials from '../../../components/HomePage/testimonials/Testimonials';
import Contact from '../../../components/HomePage/contact/Contact';
import RegistrationForm from '../../../components/HomePage/registration-form/Registration-Form';
import Footer from '../../../components/HomePage/footer/Footer';

function Home() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Testimonials />
      <Contact />
      <RegistrationForm />
      <Footer />
    </div>
  );
}

export default Home;