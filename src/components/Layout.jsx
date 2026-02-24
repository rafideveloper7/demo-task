import React from "react";
import TopHeader from "./TopHeader";

const Layout = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <TopHeader />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#E6E6E6] bg-white">
          <div className="p-6 space-y-4">
            <div className="bg-[#0078BD] text-white px-4 py-2 rounded-lg cursor-pointer">
              Overview
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
              Driver
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
              Clients
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-[#F9FAFB] overflow-auto">
          <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total Call", value: "1,245" },
              { title: "Total Rems", value: "970" },
              { title: "Total RPM", value: "2.5M" },
              { title: "Total PRI", value: "450" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="text-gray-500 text-sm">{item.title}</p>
                <p className="text-xl font-semibold mt-2">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Driver List */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-auto">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">List of Driver</h3>
                <span className="text-sm text-[#0078BD] cursor-pointer">
                  View All
                </span>
              </div>

              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="py-2">Guy Hawkins</td>
                      <td className="py-2 text-[#0078BD]">
                        tim.jennings@example.com
                      </td>
                      <td className="py-2">******</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Client List */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-auto">
              <h3 className="font-semibold mb-4">List of Clients</h3>

              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="text-left py-2">Clients Name</th>
                    <th className="text-left py-2">Services</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="py-2">Eleanor Pena</td>
                      <td className="py-2 space-x-4">
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full">
                          Seo
                        </span>
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                          UI/UX Design
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                          Web Development
                        </span>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                          Consulting
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;