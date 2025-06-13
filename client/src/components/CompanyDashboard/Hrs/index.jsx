// pages/HRs.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AddHRModal from './addHRModal/AddHRModal';
import { FaPlus } from 'react-icons/fa';


const HRs = () => {
  const [hrs, setHrs] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@abcompany.com', phone: '555-0101', department: 'HR', position: 'HR Manager' },
    { id: 2, name: 'Michael Chen', email: 'michael@abcompany.com', phone: '555-0102', department: 'HR', position: 'Recruiter' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@abcompany.com', phone: '555-0103', department: 'HR', position: 'Payroll Specialist' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHR = (newHR) => {
    setHrs([...hrs, { ...newHR, id: hrs.length + 1 }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            HR Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage all HR personnel in your organization
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus  />  <span className='pl-1'>Add HR</span>
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hrs.map((hr) => (
                <tr key={hr.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?img=${hr.id}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{hr.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hr.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hr.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hr.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hr.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/hrs/${hr.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      View
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddHRModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddHR={handleAddHR}
      />
    </div>
  );
};

export default HRs;