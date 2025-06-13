import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiMail, FiTrash2 } from 'react-icons/fi';
import ActionButton from '../actionButton/ActionButton';
import Table from '../table/Table';

const RegisteredCompanies = () => {
  const navigate = useNavigate();
  
  // Sample data - replace with API call
  const companies = [
    { id: 1, name: 'TechSolutions PK', email: 'contact@tech.com', employees: 42, status: 'active', joined: '2023-05-15' },
    { id: 2, name: 'MediCare Ltd', email: 'info@medicare.com', employees: 120, status: 'active', joined: '2023-04-22' },
    // ... more companies
  ];

  const columns = [
    { header: 'Company Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Employees', accessor: 'employees' },
    { header: 'Status', 
      accessor: 'status',
      cell: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { header: 'Joined Date', accessor: 'joined' },
    { header: 'Actions', 
      cell: (_, row) => (
        <div className="flex space-x-2">
          <ActionButton 
            icon={<FiEye />} 
            onClick={() => navigate(`/companies/${row.id}`)}
            tooltip="View Details"
          />
          <ActionButton
            icon={<FiMail />} 
            onClick={() => navigate(`/companies/${row.id}/message`)}
            tooltip="Send Message"
          />
          <ActionButton 
            icon={<FiTrash2 />} 
            onClick={() => console.log('Delete', row.id)}
            tooltip="Remove Company"
            danger
          />
        </div>
      )
    }
  ];

  return (
 
      <Table
        data={companies}
        columns={columns}
        onRowClick={(row) => navigate(`/companies/${row.id}`)}
      />
 
  );
};

export default RegisteredCompanies;