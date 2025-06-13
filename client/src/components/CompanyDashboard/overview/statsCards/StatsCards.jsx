// components/Dashboard/StatsCards.jsx
const StatsCards = () => {
  const stats = [
    { name: 'Total HRs', value: '24', change: '+4', changeType: 'positive' },
    { name: 'Total Employees', value: '143', change: '+12', changeType: 'positive' },
    { name: 'Active Departments', value: '8', change: '+1', changeType: 'positive' },
    { name: 'Pending Leaves', value: '5', change: '-2', changeType: 'negative' },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="px-4 py-5 bg-white rounded-lg shadow sm:p-6">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              <div className="flex items-baseline mt-1">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <span className={`ml-2 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <div className={`p-3 rounded-full ${stat.changeType === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.changeType === 'positive' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;