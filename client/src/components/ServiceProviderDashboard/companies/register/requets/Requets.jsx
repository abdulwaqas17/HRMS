import React, { useState } from 'react';

// import { Table, ActionButton } from '../../components/Table';
import { FiCheck, FiX, FiMail, FiClock } from 'react-icons/fi';
import InviteModal from '../inviteModal/InviteModal';
import ActionButton from '../actionButton/ActionButton';
import Table from '../table/Table';

const InviteRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  
  // Sample data - replace with API call
  const requests = [
    { id: 1, name: 'EduSoft', email: 'contact@edusoft.com', employees: '15-20', requested: '2023-07-10', message: 'Interested in your HR solutions' },
    { id: 2, name: 'BuildIt Constructions', email: 'info@buildit.com', employees: '50-100', requested: '2023-07-08', message: 'Need HR system for our workers' },
    // ... more requests
  ];

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setShowInviteModal(true);
  };

  const handleReject = (id) => {
    console.log('Reject request', id);
    // API call to reject request
  };

  const sendInvitation = (emailData) => {
    console.log('Sending invitation to:', selectedRequest.email, 'with data:', emailData);
    // API call to send invitation
    setShowInviteModal(false);
  };

  const columns = [
    { header: 'Company Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Employees', accessor: 'employees' },
    { header: 'Request Date', accessor: 'requested' },
    { header: 'Message', accessor: 'message', cell: (value) => <span className="truncate max-w-xs">{value}</span> },
    { header: 'Actions', 
      cell: (_, row) => (
        <div className="flex space-x-2">
          <ActionButton 
            icon={<FiCheck />} 
            onClick={() => handleApprove(row)}
            tooltip="Approve & Send Invite"
            success
          />
          <ActionButton
            icon={<FiX />} 
            onClick={() => handleReject(row.id)}
            tooltip="Reject Request"
            danger
          />
        </div>
      )
    }
  ];

  return (
    
  <div>
        <Table
        data={requests}
        columns={columns}
      />
      
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        company={selectedRequest}
        onSubmit={sendInvitation}
      />
    
  </div>
  );
};

export default InviteRequests;