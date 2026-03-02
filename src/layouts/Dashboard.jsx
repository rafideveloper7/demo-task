import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

export default function Dashboard({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex max-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Border Line - hidden on mobile */}
        {!isMobile && <div className="h-[1px] bg-[#E6E6E6] ml-[280px]" />}
        
        {/* Navbar */}
        <Navbar />

        {/* Content Area - adjusted padding for mobile */}
        <main className="flex-1 overflow-auto bg-[#FFFFFF] p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}