import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import overview from '../assets/icons/overview.svg';
import car from '../assets/icons/car.svg';
import client from '../assets/icons/client.svg';

export default function Sidebar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: <img src={overview} alt="overview" className="w-3 h-3" /> },
    { label: 'Driver', path: '/drivers', icon: <img src={car} alt="car" className="w-3 h-3" /> },
    { label: 'Clients', path: '/clients', icon: <img src={client} alt="client" className="w-3 h-3" /> },
  ];

  // Close mobile menu when route changes
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - visible only on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0078BD] text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile by default, shown when menu is open */}
      <aside
        className={`
          fixed lg:relative z-50
          w-[280px] bg-white min-h-screen flex flex-col shadow-[0px_4px_14px_rgba(0,0,0,0.1)]
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo/Brand */}
        <div className="pl-6 pt-6 pb-8">
          <h1 className="font-roboto italic font-semibold text-2xl text-[#0078BD] leading-[120%]">
            Earnings Dashboard
          </h1>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-6 py-[11px] w-full transition-all ${
                location.pathname === item.path
                  ? 'bg-[#0078BD] text-white'
                  : 'text-[#666666] hover:bg-gray-50'
              }`}
            >
              <span className="text-lg w-4 h-4 flex items-center justify-center">
                {item.icon}
              </span>
              <span className="font-roboto font-normal text-sm leading-[120%]">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

      
      </aside>
    </>
  );
}