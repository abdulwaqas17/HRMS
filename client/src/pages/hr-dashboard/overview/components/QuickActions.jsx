import React from 'react';
import { 
  FiUserPlus, FiFileText, FiSend, 
  FiCalendar, FiDollarSign, FiSettings 
} from 'react-icons/fi';

const QuickActions = () => {
  const actions = [
    { icon: <FiUserPlus size={18} />, label: "Add Employee", path: "/hr/employees/add" },
    { icon: <FiFileText size={18} />, label: "Generate Report", path: "/hr/reports" },
    { icon: <FiSend size={18} />, label: "Send Announcement", path: "/hr/announcements" },
    { icon: <FiCalendar size={18} />, label: "Manage Leaves", path: "/hr/leaves" },
    { icon: <FiDollarSign size={18} />, label: "Process Payroll", path: "/hr/payroll" },
    { icon: <FiSettings size={18} />, label: "HR Settings", path: "/hr/settings" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, index) => (
        <a
          key={index}
          href={action.path}
          className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
        >
          <div className="p-2 mb-2 rounded-full bg-blue-100 text-blue-600">
            {action.icon}
          </div>
          <span className="text-sm font-medium text-center text-gray-700">{action.label}</span>
        </a>
      ))}
    </div>
  );
};

export default QuickActions;