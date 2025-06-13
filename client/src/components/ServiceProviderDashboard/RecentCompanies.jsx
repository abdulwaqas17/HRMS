import React from 'react';

const RecentCompanies = () => {
  const companies = [
    { name: "TechSolutions PK", joined: "2 hours ago", status: "active" },
    { name: "MediCare Ltd", joined: "1 day ago", status: "active" },
    { name: "RetailCorp", joined: "2 days ago", status: "pending" },
    { name: "EduSoft", joined: "3 days ago", status: "active" },
    { name: "BuildIt Constructions", joined: "5 days ago", status: "active" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Companies</h2>
      <div className="space-y-4">
        {companies.map((company, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{company.name}</p>
              <p className="text-sm text-gray-500">{company.joined}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {company.status}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
        View All Companies →
      </button>
    </div>
  );
};

export default RecentCompanies;