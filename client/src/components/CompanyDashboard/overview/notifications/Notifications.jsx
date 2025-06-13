// components/Dashboard/Notifications.jsx
import React from 'react';
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'; // Importing icons from react-icons

const notifications = [
  {
    id: 1,
    title: 'New leave request',
    message: 'John Doe has requested 2 days of sick leave',
    icon: FaExclamationTriangle, // Replaced ExclamationIcon
    iconColor: 'text-yellow-500',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Payroll processed',
    message: 'June payroll has been successfully processed',
    icon: FaCheckCircle, // Replaced CheckCircleIcon
    iconColor: 'text-green-500',
    time: '1 day ago',
    read: true,
  },
  {
    id: 3,
    title: 'System maintenance',
    message: 'Scheduled maintenance this weekend',
    icon: FaInfoCircle, // Replaced InformationCircleIcon
    iconColor: 'text-blue-500',
    time: '3 days ago',
    read: true,
  },
];

const Notifications = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Mark all as read
        </button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-indigo-50'}`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {/* React Icons are components themselves, so they are rendered directly */}
                <notification.icon className={`w-5 h-5 ${notification.iconColor}`} aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${notification.read ? 'text-gray-800' : 'text-indigo-800'}`}>
                  {notification.title}
                </p>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    New
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;