import DashboardLayout from '@/components/ServiceProviderDashboard/DashboardLayout';
import Overview from '@/components/ServiceProviderDashboard/Overview';
import React from 'react';


function AdminDashboard() {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  );
}

export default AdminDashboard;