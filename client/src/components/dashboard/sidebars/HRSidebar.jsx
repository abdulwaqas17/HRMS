import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiCalendar, FiClock, 
  FiDollarSign, FiSettings 
} from 'react-icons/fi';

const HRSidebar = ({ isOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">HR Dashboard</h1>
      </div>
      <nav className="mt-6">
        <NavLink to="/hr/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
          <FiHome className="mr-3" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/hr/employees" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
          <FiUsers className="mr-3" />
          <span>Employees</span>
        </NavLink>
        <NavLink to="/hr/attendance" className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
          <FiClock className="mr-3" />
          <span>Attendance</span>
        </NavLink>
        {/* Other HR links */}
      </nav>
    </div>
  );
};

export default HRSidebar;