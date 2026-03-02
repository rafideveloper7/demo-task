import { useState } from 'react';
import { useDrivers } from '../features/drivers/useDrivers';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

export default function DriversPage() {
  const { drivers, loading, error } = useDrivers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter drivers based on search and status
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver);
    setShowMobileDetail(true);
  };

  if (loading) return <Loader />;

  // Count active and inactive
  const activeCount = drivers.filter((d) => d.status === 'Active').length;
  const inactiveCount = drivers.filter((d) => d.status === 'Inactive').length;
  const totalTrips = drivers.reduce((sum, d) => sum + (d.totalTrips || 0), 0);
  const avgRating = drivers.length > 0 
    ? (drivers.reduce((sum, d) => sum + (d.rating || 0), 0) / drivers.length).toFixed(1)
    : 0;

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="font-roboto font-bold text-lg sm:text-xl md:text-2xl text-[#333333] mb-1 sm:mb-2">Drivers Management</h1>
          <p className="text-gray-600 text-xs sm:text-sm">View and manage all registered drivers</p>
        </div>

        {/* Show error if any */}
        {error && <ErrorAlert message={error} />}

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full mb-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center justify-between shadow-sm"
        >
          <span className="font-medium text-sm">🔍 Search & Filters</span>
          <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Stats Cards - Responsive grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
          <StatsCard label="Total" value={drivers.length} icon="👥" color="blue" />
          <StatsCard label="Active" value={activeCount} icon="✓" color="green" />
          <StatsCard label="Inactive" value={inactiveCount} icon="⌀" color="red" />
          <StatsCard label="Rating" value={`${avgRating}`} icon="⭐" color="yellow" />
        </div>

        {/* Filters - Collapsible on mobile */}
        <div className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm mb-4 sm:mb-6 border border-gray-200 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Drivers</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setCurrentPage(1); // Reset to first page
                }}
                className="w-full px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg hover:bg-gray-300 transition mt-6 sm:mt-0"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredDrivers.length}</span> of <span className="font-semibold">{drivers.length}</span> drivers
        </div>

        {/* Mobile Card View - visible only on small screens */}
        <div className="block md:hidden space-y-3 mb-4">
          {currentDrivers.length > 0 ? (
            currentDrivers.map((driver) => (
              <div 
                key={`driver-${driver.id}`} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
                onClick={() => handleDriverClick(driver)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                      <p className="text-xs text-gray-500">ID: {driver.id}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      driver.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {driver.status === 'Active' ? '🟢' : '🔴'} {driver.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-blue-600 truncate">{driver.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-gray-700">{driver.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Trips</p>
                    <p className="font-medium">{driver.totalTrips || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{driver.rating || 0}/5</span>
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                  <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                    View Details
                  </button>
                  <button className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100">
                    Contact
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center border border-gray-200">
              <p className="text-gray-500">No drivers found</p>
            </div>
          )}
        </div>

        {/* Desktop Table View - hidden on mobile, visible on md and up */}
        <div className="hidden md:block bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Trips</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentDrivers.length > 0 ? (
                currentDrivers.map((driver) => (
                  <tr key={`driver-${driver.id}`} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                          {driver.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{driver.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-blue-600 text-sm">{driver.email}</td>
                    <td className="py-3 px-4 text-gray-700 text-sm">{driver.phone}</td>
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm">{driver.totalTrips || 0}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs">⭐</span>
                        <span className="text-sm">{driver.rating || 0}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          driver.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {driver.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 px-4 text-center text-gray-500 text-sm">
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - visible on both mobile and desktop */}
        {filteredDrivers.length > itemsPerPage && (
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredDrivers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredDrivers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    // Show first page, last page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={`page-${page}`}
                          onClick={() => paginate(page)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === page
                              ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                              : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span
                          key={`ellipsis-${page}`}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 bg-white"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Detail Modal */}
        {showMobileDetail && selectedDriver && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileDetail(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Driver Details</h2>
                <button onClick={() => setShowMobileDetail(false)} className="p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {selectedDriver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedDriver.name}</h3>
                    <p className="text-sm text-gray-500">ID: {selectedDriver.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Status" value={selectedDriver.status} />
                  <InfoItem label="Total Trips" value={selectedDriver.totalTrips || 0} />
                  <InfoItem label="Rating" value={`${selectedDriver.rating || 0}/5`} />
                  <InfoItem label="Phone" value={selectedDriver.phone} />
                </div>
                
                <InfoItem label="Email" value={selectedDriver.email} />
                
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium">Contact</button>
                  <button className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium">Edit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Modal for View Details */}
        {selectedDriver && (
          <div className="hidden md:fixed md:inset-0 md:z-50 md:flex md:items-center md:justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedDriver(null)} />
            <div className="relative bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Driver Details</h2>
                <button onClick={() => setSelectedDriver(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {selectedDriver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedDriver.name}</h3>
                    <p className="text-sm text-gray-500">ID: {selectedDriver.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Status" value={selectedDriver.status} />
                  <InfoItem label="Total Trips" value={selectedDriver.totalTrips || 0} />
                  <InfoItem label="Rating" value={`${selectedDriver.rating || 0}/5`} />
                  <InfoItem label="Phone" value={selectedDriver.phone} />
                </div>
                
                <InfoItem label="Email" value={selectedDriver.email} />
                
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium">Contact</button>
                  <button className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium">Edit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats - Responsive grid */}
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:gap-4 lg:gap-6">
          <SummaryCard label="Total Trips" value={totalTrips.toLocaleString()} />
          <SummaryCard label="Avg Rating" value={`${avgRating}/5`} />
          <SummaryCard label="Active Now" value={activeCount} />
          <SummaryCard label="Avg Trips" value={drivers.length > 0 ? Math.floor(totalTrips / drivers.length) : 0} />
        </div>
      </div>
    </div>
  );
}

// Info item for mobile detail modal
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

// Small stat card component - Mobile optimized
function StatsCard({ label, value, icon, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  };

  return (
    <div className={`${colors[color]} rounded-lg p-2 sm:p-3 lg:p-4 border`}>
      <p className="text-gray-600 text-xs truncate">{label}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-base sm:text-lg lg:text-xl font-bold">{value}</p>
        <span className="text-lg sm:text-xl lg:text-2xl">{icon}</span>
      </div>
    </div>
  );
}

// Summary stat at bottom - Mobile optimized
function SummaryCard({ label, value }) {
  return (
    <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-lg shadow border border-gray-200">
      <p className="text-gray-600 text-xs truncate">{label}</p>
      <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}