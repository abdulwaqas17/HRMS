import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ icon, title, value, change, trend }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
          {trend === 'up' ? (
            <FiTrendingUp className="inline ml-1" />
          ) : (
            <FiTrendingDown className="inline ml-1" />
          )}
        </span>
      </div>
      <h3 className="text-gray-500 text-sm mt-4">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
};

export default StatCard;