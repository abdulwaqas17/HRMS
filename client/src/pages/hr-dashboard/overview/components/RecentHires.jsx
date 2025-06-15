import React from 'react';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';

const RecentHires = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((hire, index) => (
        <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex-shrink-0 p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
            <FiUser className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{hire.name}</p>
            <p className="text-sm text-gray-500 truncate">{hire.position}</p>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <FiCalendar className="mr-1" />
            {format(new Date(hire.joinDate), 'MMM d, yyyy')}
          </div>
        </div>
      ))}
      <button className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
        View all hires
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default RecentHires;