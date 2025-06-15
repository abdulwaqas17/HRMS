import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ icon, title, value, change, trend }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
        <span className={`inline-flex items-center text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {change}
          {trend === 'up' ? (
            <FiTrendingUp className="ml-1" />
          ) : (
            <FiTrendingDown className="ml-1" />
          )}
        </span>
      </div>
      <h3 className="text-gray-500 text-sm mt-4">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
};

export default StatCard;