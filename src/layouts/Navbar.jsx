import { AuthContext } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const [showMobileButtons, setShowMobileButtons] = useState(false);

  return (
    <div className="bg-white border-b border-[#C6C6C6] px-4 sm:px-6 py-4 flex justify-end items-center">
      
      <div className="flex items-center gap-2 sm:gap-5">
        {/* Mobile Menu Button for actions */}
        <button
          onClick={() => setShowMobileButtons(!showMobileButtons)}
          className="md:hidden p-2 text-[#0078BD] hover:bg-[rgba(0,120,189,0.07)] rounded-lg transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        {/* Desktop Buttons - always visible on desktop */}
        <div className="hidden md:flex items-center gap-5">
          <ActionButtons />
        </div>

        {/* Mobile Buttons - shown when menu is open */}
        {showMobileButtons && (
          <div className="absolute top-20 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border border-gray-200 md:hidden">
            <div className="flex flex-col gap-3">
              <ActionButtons mobile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Action Buttons component to avoid code duplication
function ActionButtons({ mobile = false }) {
  const buttonClass = mobile
    ? "flex items-center justify-center gap-1.5 px-4 py-2 w-full"
    : "flex items-center justify-center gap-1.5 px-4 py-2";

  return (
    <>
      {/* Add Client Button */}
      <button className={`${buttonClass} bg-[rgba(0,120,189,0.07)] rounded-[10px] hover:bg-[rgba(0,120,189,0.12)] transition`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12H18" stroke="#0078BD" strokeWidth="2"/>
          <path d="M12 6V18" stroke="#0078BD" strokeWidth="2"/>
        </svg>
        <span className="font-roboto font-medium text-sm text-[#0078BD]">Add Client</span>
      </button>

      {/* Add Driver Button */}
      <button className={`${buttonClass} bg-[#0078BD] rounded-[10px] hover:bg-[#0069a5] transition`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12H18" stroke="white" strokeWidth="2"/>
          <path d="M12 6V18" stroke="white" strokeWidth="2"/>
        </svg>
        <span className="font-roboto font-medium text-sm text-white">Add Driver</span>
      </button>
    </>
  );
}