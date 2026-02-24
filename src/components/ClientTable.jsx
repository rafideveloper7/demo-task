import React from 'react';

const ClientTable = ({ clients }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">List of Clients</h2>
      
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase">
            <th className="pb-3 font-medium">Clients Name</th>
            <th className="pb-3 font-medium">Services</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clients.map((client, index) => (
            <tr key={index} className="text-sm">
              <td className={`py-3 ${
                client.name.includes('inactive') 
                  ? 'text-red-500' 
                  : 'text-gray-900'
              }`}>
                {client.name}
              </td>
              <td className="py-3 text-gray-500">{client.services}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;