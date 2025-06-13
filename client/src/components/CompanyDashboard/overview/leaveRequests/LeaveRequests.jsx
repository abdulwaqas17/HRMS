// components/Dashboard/LeaveRequests.jsx
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'; // Importing icons from react-icons

const LeaveRequests = () => {
  const leaves = [
    { id: 1, name: 'John Doe', type: 'Sick Leave', date: '2023-06-15', days: 2, status: 'pending' },
    { id: 2, name: 'Jane Smith', type: 'Annual Leave', date: '2023-06-18', days: 5, status: 'approved' },
    { id: 3, name: 'Robert Johnson', type: 'Emergency Leave', date: '2023-06-20', days: 1, status: 'rejected' },
    { id: 4, name: 'Emily Davis', type: 'Maternity Leave', date: '2023-06-22', days: 90, status: 'pending' },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Leave Requests</h3>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Employee
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Days
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img className="w-10 h-10 rounded-full" src={`https://i.pravatar.cc/150?img=${leave.id}`} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{leave.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{leave.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{leave.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{leave.days}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[leave.status]}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {leave.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button className="p-1 text-green-600 rounded-full hover:bg-green-100">
                        <FaCheckCircle className="w-4 h-4" /> {/* Replaced CheckIcon */}
                      </button>
                      <button className="p-1 text-red-600 rounded-full hover:bg-red-100">
                        <FaTimesCircle className="w-4 h-4" /> {/* Replaced XIcon */}
                      </button>
                    </div>
                  )}
                  {/* You could also use FaClock for pending status if desired, like this: */}
                  {/* {leave.status === 'pending' && <FaClock className="w-4 h-4 text-yellow-600" />} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;