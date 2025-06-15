import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUser,
  FiLayers,
  FiChevronDown,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiSettings,
} from "react-icons/fi";

const CompanySidebar = ({ isOpen }) => {
  const [activeSubmenu, setActiveSubmenu] = useState("");

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? "" : menu);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 transition-all duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Company Dashboard</h1>
      </div>
      <nav className="mt-6">
        {/* Dashboard */}
        <NavLink
          to="/company/dashboard"
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        >
          <FiHome className="mr-3" />
          <span>Dashboard</span>
        </NavLink>

        {/* HR Management */}
        <div className="mb-1">
          <button
            onClick={() => toggleSubmenu("hr")}
            className="flex items-center justify-between w-full px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <div className="flex items-center">
              <FiUsers className="mr-3" />
              <span>HR Management</span>
            </div>
            <FiChevronDown
              className={`transition-transform ${
                activeSubmenu === "hr" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeSubmenu === "hr" && (
            <div className="pl-12">
              <NavLink
                to="/company/hrs"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50"
              >
                All HRs
              </NavLink>
              <NavLink
                to="/company/hrs/add"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50"
              >
                Add New HR
              </NavLink>
            </div>
          )}
        </div>

        {/* Employees */}
        <NavLink
          to="/company/employees"
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        >
          <FiUser className="mr-3" />
          <span>Employees</span>
        </NavLink>

        {/* Other company admin links */}
      </nav>
    </div>
  );
};

export default CompanySidebar;
