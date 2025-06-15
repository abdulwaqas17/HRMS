import React from 'react';

const LeaveBalanceTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casual</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sick</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.department}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.casual}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.annual}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.sick}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveBalanceTable;