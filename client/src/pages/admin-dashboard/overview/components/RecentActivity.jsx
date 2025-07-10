import React from 'react';
import { FiUser, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

const iconMap = {
  'New employee onboarded': <FiUser className="text-green-500" />,
  'Leave request approved': <FiCheckCircle className="text-blue-500" />,
  'Payroll processed': <FiDollarSign className="text-purple-500" />,
};

const RecentActivity = ({ action, person, time }) => {
  return (
    <div className="flex items-start">
      <div className="p-2 rounded-full bg-gray-50 mr-3">
        {iconMap[action] || <FiUser />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{action}</p>
        <p className="text-xs text-gray-500">{person} • {time}</p>
      </div>
    </div>
  );
};

export default RecentActivity;