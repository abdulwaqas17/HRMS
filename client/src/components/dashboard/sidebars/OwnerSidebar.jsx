import React, { useState } from 'react';
import { 
  FiHome, FiBriefcase, FiCreditCard, FiPieChart, 
  FiSettings, FiHelpCircle, FiFileText, FiUsers,
  FiChevronDown, FiChevronRight
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const OwnerSidebar = ({ isOpen }) => {
  const [companiesOpen, setCompaniesOpen] = useState(false);
  
  const navItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/owner/dashboard" },
    { 
      icon: <FiBriefcase />, 
      label: "Companies", 
      path: "/owner/companies",
      subItems: [
        { label: "Registered", path: "/owner/companies/registered" },
        { label: "Requests", path: "/owner/companies/requests" }
      ]
    },
    { icon: <FiCreditCard />, label: "Payments", path: "/owner/payments" },
    { icon: <FiPieChart />, label: "Subscriptions", path: "/owner/subscriptions" },
    { icon: <FiHelpCircle />, label: "Support Tickets", path: "/owner/support" },
    { icon: <FiFileText />, label: "Reports", path: "/owner/reports" },
    { icon: <FiUsers />, label: "User Management", path: "/owner/users" },
    { icon: <FiSettings />, label: "Settings", path: "/owner/settings" },
  ];

  const toggleCompanies = () => {
    setCompaniesOpen(!companiesOpen);
  };

  return (
    <div className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Owner Dashboard</h1>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <>
                <button
                  onClick={toggleCompanies}
                  
                  className={`flex items-center justify-between w-full px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                    location.pathname.startsWith(item.path) ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                  }`}

                  //  className={({ isActive }) => `flex items-center justify-between w-full px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                  //   isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                  // }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {companiesOpen ? (
                    <FiChevronDown className="text-gray-400" />
                  ) : (
                    <FiChevronRight className="text-gray-400" />
                  )}
                </button>
                
                {companiesOpen && (
                  <div className="ml-4 pl-8 border-l-2 border-gray-100">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) => 
                          `block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded ${
                            isActive ? 'bg-blue-50 text-blue-600' : ''
                          }`
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                    isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            )}
          </div>
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

export default OwnerSidebar;