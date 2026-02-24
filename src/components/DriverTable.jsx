import React, { useState } from 'react';

const DriverTable = ({ drivers }) => {
  const [driverFilter, setDriverFilter] = useState('active'); // 'active' or 'inactive'

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">List of Driver</h2>
      
      {/* Status Tabs */}
      <div className="flex gap-4 mb-4 border-b border-gray-200">
        <button
          onClick={() => setDriverFilter('active')}
          className={`pb-2 text-sm font-medium ${
            driverFilter === 'active'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setDriverFilter('inactive')}
          className={`pb-2 text-sm font-medium ${
            driverFilter === 'inactive'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          Inactive
        </button>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {drivers
            .filter(d => driverFilter === 'active' ? d.status === 'active' : d.status === 'inactive')
            .map((driver, index) => (
              <tr key={index} className="text-sm">
                <td className="py-3 text-gray-900">{driver.name}</td>
                <td className="py-3 text-gray-500">{driver.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;