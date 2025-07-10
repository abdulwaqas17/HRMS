import React from 'react';
import { 
  FiCircle, FiUser, FiUserCheck, FiUserX, 
  FiClock, FiAlertTriangle 
} from 'react-icons/fi';

const EmployeeDistribution = () => {
  // Sample data - replace with API call
  const employeeStatus = [
    { status: 'Active', count: 120, color: 'bg-green-500', icon: <FiUserCheck className="text-green-500" /> },
    { status: 'On Leave', count: 15, color: 'bg-yellow-500', icon: <FiClock className="text-yellow-500" /> },
    { status: 'Probation', count: 25, color: 'bg-blue-500', icon: <FiUser className="text-blue-500" /> },
    { status: 'Terminated', count: 5, color: 'bg-red-500', icon: <FiUserX className="text-red-500" /> },
    { status: 'Notice Period', count: 7, color: 'bg-purple-500', icon: <FiAlertTriangle className="text-purple-500" /> },
  ];

  const totalEmployees = employeeStatus.reduce((sum, item) => sum + item.count, 0);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {employeeStatus.map((item, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className={`w-10 h-10 rounded-full ${item.color} bg-opacity-20 flex items-center justify-center mr-3`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{item.status}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{item.count}</p>
                <p className="text-sm text-gray-500">
                  {Math.round((item.count / totalEmployees) * 100)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        {employeeStatus.map((item, index) => {
          const percentage = (item.count / totalEmployees) * 100;
          const prevPercentage = employeeStatus
            .slice(0, index)
            .reduce((sum, i) => sum + (i.count / totalEmployees) * 100, 0);
          
          return (
            <div 
              key={index}
              className={`absolute h-full ${item.color}`}
              style={{
                width: `${percentage}%`,
                left: `${prevPercentage}%`
              }}
            ></div>
          );
        })}
      </div>
      
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {employeeStatus.map((item, index) => (
          <div key={index} className="flex items-center">
            <FiCircle className={`text-xs mr-1 ${item.color}`} />
            <span className="text-xs text-gray-600">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDistribution;