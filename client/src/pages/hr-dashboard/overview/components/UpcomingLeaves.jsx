import React from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';

const UpcomingLeaves = ({ data }) => {
  const getLeaveColor = (type) => {
    switch(type.toLowerCase()) {
      case 'annual':
        return 'bg-purple-100 text-purple-800';
      case 'casual':
        return 'bg-blue-100 text-blue-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {data.map((leave, index) => (
        <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className={`flex-shrink-0 p-2 rounded-full mr-3 ${getLeaveColor(leave.type)}`}>
            <FiCalendar className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{leave.name}</p>
            <p className="text-xs text-gray-500">{leave.department}</p>
          </div>
          <div className="flex items-center">
            <span className={`text-xs px-2 py-1 rounded-full mr-2 ${getLeaveColor(leave.type)}`}>
              {leave.type}
            </span>
            <div className="text-xs text-gray-500 flex items-center">
              <FiClock className="mr-1" />
              {format(new Date(leave.startDate), 'MMM d')} ({leave.days}d)
            </div>
          </div>
        </div>
      ))}
      <button className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
        View all leaves
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default UpcomingLeaves;