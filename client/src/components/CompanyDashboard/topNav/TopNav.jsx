// components/Layout/TopNav.jsx
import { Link } from 'react-router-dom';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';

const TopNav = ({ toggleSidebar }) => {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-1 text-gray-500 rounded-md md:hidden hover:text-gray-600 hover:bg-gray-100"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <Link to="/" className="ml-2 text-xl font-bold text-indigo-600 md:ml-0">AB Company</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-500 rounded-full hover:text-gray-600 hover:bg-gray-100">
            <BellIcon className="w-6 h-6" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2">
              <img 
                className="w-8 h-8 rounded-full" 
                src="https://randomuser.me/api/portraits/men/1.jpg" 
                alt="User" 
              />
              <span className="hidden text-sm font-medium md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;