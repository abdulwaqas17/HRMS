import React from 'react';
import { 
  FiHome, FiBriefcase, FiCreditCard, FiPieChart, 
  FiSettings, FiHelpCircle, FiFileText, FiUsers 
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FiBriefcase />, label: "Companies", path: "/companies" },
    { icon: <FiCreditCard />, label: "Payments", path: "/payments" },
    { icon: <FiPieChart />, label: "Subscriptions", path: "/subscriptions" },
    { icon: <FiHelpCircle />, label: "Support Tickets", path: "/support" },
    { icon: <FiFileText />, label: "Reports", path: "/reports" },
    { icon: <FiUsers />, label: "User Management", path: "/users" },
    { icon: <FiSettings />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">HRMS Admin</h1>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}`
            }
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600">SP</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">Service Provider</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;