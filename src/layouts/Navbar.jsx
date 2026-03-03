// In Navbar.jsx
import { useState } from 'react';
import AddClientModal from '../features/clients/AddClientModal';
import AddDriverModal from '../features/drivers/AddDriverModal';

export default function Navbar() {
  const [showClientModal, setShowClientModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    // Trigger refresh in parent components if needed
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="bg-white border-b border-[#C6C6C6] px-6 py-4 flex justify-end items-center">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setShowClientModal(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[rgba(0,120,189,0.07)] rounded-[10px] hover:bg-[rgba(0,120,189,0.12)] transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 12H18" stroke="#0078BD" strokeWidth="2"/>
              <path d="M12 6V18" stroke="#0078BD" strokeWidth="2"/>
            </svg>
            <span className="font-roboto font-medium text-sm text-[#0078BD]">Add Client</span>
          </button>

          <button 
            onClick={() => setShowDriverModal(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0078BD] rounded-[10px] hover:bg-[#0069a5] transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 12H18" stroke="white" strokeWidth="2"/>
              <path d="M12 6V18" stroke="white" strokeWidth="2"/>
            </svg>
            <span className="font-roboto font-medium text-sm text-white">Add Driver</span>
          </button>
        </div>
      </div>

      <AddClientModal 
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        onSuccess={handleSuccess}
      />

      <AddDriverModal 
        isOpen={showDriverModal}
        onClose={() => setShowDriverModal(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}