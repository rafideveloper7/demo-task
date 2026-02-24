import React from 'react';
import TopHeader from './TopHeader';
import overviewImg from '../assets/images/overview.png';
import carImg from '../assets/images/car-01.png';
import userImg from '../assets/images/user-01.png';

const Sidebar = () => {
  const menuItems = [
    { icon: overviewImg, label: 'Dashboard', active: true, path: '/dashboard' },
    { icon: carImg, label: 'Drivers', active: false, path: '/drivers' },
    { icon: userImg, label: 'Clients', active: false, path: '/clients' },
  ];

  return (
    <aside className="relative w-[280px] bg-white border-r border-gray-600 flex flex-col">
      <TopHeader />

      <nav className="flex-1 ">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center  text-sm ${
              item.active
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span><img src={item.icon} alt={item.label} className="w-5 h-5 mr-3" /></span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;