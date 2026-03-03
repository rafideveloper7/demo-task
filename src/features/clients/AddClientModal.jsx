import { useState } from 'react';
import { mockClientsData } from '../../services/mockData';

export default function AddClientModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Standard',
    status: 'Active',
    services: []
  });
  const [serviceInput, setServiceInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new client with unique ID
    const newClient = {
      id: mockClientsData.length + 1,
      ...formData,
      services: formData.services.length ? formData.services : ['Seo', 'Consulting']
    };
    
    // Add to mock data array
    mockClientsData.push(newClient);
    
    // Reset form and close
    setFormData({ name: '', email: '', phone: '', type: 'Standard', status: 'Active', services: [] });
    onSuccess();
    onClose();
  };

  const addService = () => {
    if (serviceInput && !formData.services.includes(serviceInput)) {
      setFormData({
        ...formData,
        services: [...formData.services, serviceInput]
      });
      setServiceInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-[#0078BD]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#333333]">Add New Client</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078BD]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078BD]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078BD]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078BD]"
              >
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="Add a service"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078BD]"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 bg-[#0078BD] text-white rounded-lg hover:bg-[#0069a5]"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.services.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
                    {s}
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        services: formData.services.filter((_, idx) => idx !== i)
                      })}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#0078BD] text-white rounded-lg hover:bg-[#0069a5]"
              >
                Add Client
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}