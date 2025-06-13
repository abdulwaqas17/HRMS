// components/Layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  ClockIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  CogIcon,
  PlusIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [showHRSubmenu, setShowHRSubmenu] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/company-dashboard/' },
    { 
      name: 'HRs', 
      icon: UsersIcon, 
      path: '/company-dashboard/hrs',
      submenu: [
        { name: 'All HRs', path: '/company-dashboard/hrs' },
        { name: 'Add New HR', path: '/company-dashboard/hrs/add' }
      ]
    },
    { name: 'Employees', icon: UserGroupIcon, path: '/company-dashboard/employees' },
    { name: 'Departments', icon: BuildingOfficeIcon, path: '/company-dashboard/departments' },
    { name: 'Attendance', icon: ClockIcon, path: '/company-dashboard/attendance' },
    { name: 'Leaves', icon: CalendarIcon, path: '/company-dashboard/leaves' },
    { name: 'Payroll', icon: CurrencyDollarIcon, path: '/company-dashboard/payroll' },
    { name: 'Settings', icon: CogIcon, path: '/company-dashboard/settings' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-screen bg-indigo-700 text-white">
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-800">
          <h1 className="text-xl font-bold">AB Company</h1>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button 
                      onClick={() => setShowHRSubmenu(!showHRSubmenu)}
                      className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-indigo-600"
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                      <ChevronDownIcon className={`w-4 h-4 ml-auto transition-transform ${showHRSubmenu ? 'transform rotate-180' : ''}`} />
                    </button>
                    {showHRSubmenu && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            className={({ isActive }) => 
                              `block px-4 py-2 text-sm rounded-md ${isActive ? 'bg-indigo-900' : 'hover:bg-indigo-600'}`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-indigo-900' : 'hover:bg-indigo-600'}`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-indigo-600">
          <div className="flex items-center">
            <img 
              className="w-10 h-10 rounded-full" 
              src="https://randomuser.me/api/portraits/men/1.jpg" 
              alt="Admin" 
            />
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-indigo-200">admin@abcompany.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;