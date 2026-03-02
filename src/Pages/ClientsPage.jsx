import { useState, useEffect } from "react";
import { getClientsAPI } from "../features/clients/clientsAPI";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // Fetch clients when page loads
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getClientsAPI();
      const clientsList = response.data;
      if (Array.isArray(clientsList)) {
        setClients(clientsList);
      } else {
        setClients([]);
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError(err.message || "Failed to fetch clients");
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter clients based on search and type
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || client.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowMobileDetail(true);
  };

  const handleEditClient = (client) => {
    // Add edit functionality here
    console.log("Edit client:", client);
  };

  if (loading) return <Loader />;

  // Count by type - matching Figma colors
  const enterpriseCount = clients.filter((c) => c.type === "Enterprise").length;
  const premiumCount = clients.filter((c) => c.type === "Premium").length;
  const standardCount = clients.filter((c) => c.type === "Standard").length;
  const activeCount = clients.filter((c) => c.status === "Active").length;

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header - Figma style */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="font-roboto font-bold text-xl sm:text-2xl md:text-2xl text-[#333333] mb-1 sm:mb-2">
            Clients Management
          </h1>
          <p className="font-inter text-xs sm:text-sm text-[rgba(51,51,51,0.7)]">
            View and manage all registered clients
          </p>
        </div>

        {/* Show error if any */}
        {error && <ErrorAlert message={error} />}

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full mb-3 px-4 py-2.5 bg-white border border-[#E6E6E6] rounded-lg flex items-center justify-between shadow-sm"
        >
          <span className="font-roboto font-medium text-sm text-[#333333]">
            🔍 Search & Filters
          </span>
          <svg
            className={`w-5 h-5 text-[#666666] transition-transform ${showFilters ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Stats Cards - Matching Figma exactly */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
          <StatsCard
            label="Total Clients"
            value={clients.length}
            icon="👥"
            color="blue"
          />
          <StatsCard
            label="Enterprise"
            value={enterpriseCount}
            icon="👑"
            color="red"
          />
          <StatsCard
            label="Premium"
            value={premiumCount}
            icon="⭐"
            color="yellow"
          />
          <StatsCard
            label="Active"
            value={activeCount}
            icon="✅"
            color="green"
          />
        </div>

        {/* Filters - Figma style */}
        <div
          className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-[0px_2px_16px_#E3EBFC] mb-4 sm:mb-6 border border-[#F7F7F7] ${showFilters ? "block" : "hidden md:block"}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block font-inter text-xs font-medium text-[rgba(51,51,51,0.7)] mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078BD] focus:border-transparent font-inter"
              />
            </div>
            <div>
              <label className="block font-inter text-xs font-medium text-[rgba(51,51,51,0.7)] mb-1">
                Client Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#E6E6E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078BD] focus:border-transparent font-inter text-[#333333]"
              >
                <option value="all">All Types</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                }}
                className="w-full px-3 py-2 bg-[#E6E6E6] text-[#333333] text-sm rounded-lg hover:bg-[#d0d0d0] transition font-roboto font-medium mt-6 sm:mt-0"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results count - Figma style */}
        <div className="mb-2 sm:mb-3 font-inter text-xs sm:text-sm text-[rgba(51,51,51,0.7)]">
          Showing{" "}
          <span className="font-semibold text-[#333333]">
            {filteredClients.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-[#333333]">{clients.length}</span>{" "}
          clients
        </div>

        {/* Mobile Card View - visible only on mobile */}
        <div className="block md:hidden">
          {filteredClients.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white rounded-xl shadow-[0px_2px_16px_#E3EBFC] hover:shadow-lg transition-all duration-300 border border-[#F7F7F7] overflow-hidden"
                >
                  {/* Card Header with Figma gradient */}
                  <div className="h-20 bg-gradient-to-r from-[#0078BD] to-[#00A3FF] relative">
                    <div className="absolute -bottom-8 left-4">
                      <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center border-2 border-white">
                        <span className="text-2xl font-bold text-[#0078BD]">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <TypeBadge type={client.type} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pt-10 p-4">
                    <h3 className="font-roboto font-bold text-lg text-[#333333] mb-3">
                      {client.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-[#666666]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-inter text-sm text-[#0078BD] truncate">
                          {client.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-[#666666]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="font-inter text-sm text-[#333333]">
                          {client.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${client.status === "Active" ? "bg-[#14AE5C]" : "bg-[#DD3628]"}`}
                        />
                        <span className="font-inter text-xs text-[rgba(51,51,51,0.7)]">
                          {client.status}
                        </span>
                      </div>
                    </div>

                    {/* Services - Figma style badges */}
                    {client.services && client.services.length > 0 && (
                      <div className="mb-4">
                        <p className="font-inter text-xs text-[rgba(51,51,51,0.7)] mb-2">
                          Services
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {client.services.slice(0, 3).map((service, idx) => (
                            <ServiceBadge key={idx} service={service} />
                          ))}
                          {client.services.length > 3 && (
                            <span className="font-inter text-xs text-[rgba(51,51,51,0.7)] bg-[#FAFAFC] px-2 py-1 rounded">
                              +{client.services.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-[#E6E6E6]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClient(client);
                        }}
                        className="flex-1 py-2 bg-[#0078BD] text-white rounded-lg text-sm font-roboto font-medium hover:bg-[#0069a5] transition"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClient(client);
                        }}
                        className="flex-1 py-2 bg-[rgba(0,120,189,0.07)] text-[#0078BD] rounded-lg text-sm font-roboto font-medium hover:bg-[rgba(0,120,189,0.12)] transition"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 sm:p-12 rounded-lg shadow-[0px_2px_16px_#E3EBFC] text-center border border-[#F7F7F7]">
              <p className="font-inter text-[rgba(51,51,51,0.7)] text-sm sm:text-lg">
                No clients found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Desktop List View - visible only on desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-[0px_2px_16px_#E3EBFC] border border-[#F7F7F7] overflow-hidden mb-6">
          {filteredClients.length > 0 ? (
            <div className="divide-y divide-[#E6E6E6]">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#FAFAFC] font-roboto font-medium text-sm text-[rgba(51,51,51,0.8)]">
                <div className="col-span-3">Client Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Phone</div>
                <div className="col-span-1">Type</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">Actions</div>
              </div>

              {/* Client Rows */}
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#FAFAFC] transition items-center"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#0078BD] to-[#00A3FF] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {client.name.charAt(0)}
                    </div>
                    <span className="font-roboto font-medium text-sm text-[#333333]">
                      {client.name}
                    </span>
                  </div>
                  <div className="col-span-3 font-inter text-sm text-[#0078BD] truncate">
                    {client.email}
                  </div>
                  <div className="col-span-2 font-inter text-sm text-[#333333]">
                    {client.phone}
                  </div>
                  <div className="col-span-1">
                    <TypeBadge type={client.type} />
                  </div>
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-roboto font-medium ${
                        client.status === "Active"
                          ? "bg-[rgba(20,174,92,0.06)] text-[#14AE5C]"
                          : "bg-[rgba(221,54,40,0.06)] text-[#DD3628]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${client.status === "Active" ? "bg-[#14AE5C]" : "bg-[#DD3628]"}`}
                      />
                      {client.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <button
                      onClick={() => handleViewClient(client)}
                      className="px-3 py-1.5 bg-[#0078BD] text-white rounded-lg text-xs font-roboto font-medium hover:bg-[#0069a5] transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClient(client)}
                      className="px-3 py-1.5 bg-[rgba(0,120,189,0.07)] text-[#0078BD] rounded-lg text-xs font-roboto font-medium hover:bg-[rgba(0,120,189,0.12)] transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="font-inter text-[rgba(51,51,51,0.7)]">
                No clients found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Desktop Modal for View Details - Same as mobile modal but centered */}
        {selectedClient && (
          <div
            className={`hidden md:fixed md:inset-0 md:z-50 md:flex md:items-center md:justify-center ${selectedClient ? "md:flex" : "md:hidden"}`}
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSelectedClient(null)}
            />
            <div className="relative bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-[0px_4px_14px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-roboto font-bold text-xl text-[#333333]">
                  Client Details
                </h2>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <svg
                    className="w-6 h-6 text-[#666666]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0078BD] to-[#00A3FF] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-roboto font-semibold text-lg text-[#333333]">
                      {selectedClient.name}
                    </h3>
                    <TypeBadge type={selectedClient.type} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Status" value={selectedClient.status} />
                  <InfoItem label="Phone" value={selectedClient.phone} />
                </div>

                <InfoItem label="Email" value={selectedClient.email} />

                {selectedClient.services &&
                  selectedClient.services.length > 0 && (
                    <div>
                      <p className="font-inter text-xs text-[rgba(51,51,51,0.7)] mb-2">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.services.map((service, idx) => (
                          <ServiceBadge key={idx} service={service} />
                        ))}
                      </div>
                    </div>
                  )}

                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-[#0078BD] text-white rounded-lg font-roboto font-medium hover:bg-[#0069a5] transition">
                    Contact
                  </button>
                  <button className="flex-1 py-3 bg-[rgba(0,120,189,0.07)] text-[#0078BD] rounded-lg font-roboto font-medium hover:bg-[rgba(0,120,189,0.12)] transition">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Detail Modal - Keep existing */}
        {showMobileDetail && selectedClient && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowMobileDetail(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto shadow-[0px_-4px_14px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-roboto font-bold text-xl text-[#333333]">
                  Client Details
                </h2>
                <button
                  onClick={() => setShowMobileDetail(false)}
                  className="p-2"
                >
                  <svg
                    className="w-6 h-6 text-[#666666]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0078BD] to-[#00A3FF] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-roboto font-semibold text-lg text-[#333333]">
                      {selectedClient.name}
                    </h3>
                    <TypeBadge type={selectedClient.type} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Status" value={selectedClient.status} />
                  <InfoItem label="Phone" value={selectedClient.phone} />
                </div>

                <InfoItem label="Email" value={selectedClient.email} />

                {selectedClient.services &&
                  selectedClient.services.length > 0 && (
                    <div>
                      <p className="font-inter text-xs text-[rgba(51,51,51,0.7)] mb-2">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.services.map((service, idx) => (
                          <ServiceBadge key={idx} service={service} />
                        ))}
                      </div>
                    </div>
                  )}

                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-[#0078BD] text-white rounded-lg font-roboto font-medium">
                    Contact
                  </button>
                  <button className="flex-1 py-3 bg-[rgba(0,120,189,0.07)] text-[#0078BD] rounded-lg font-roboto font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Detail Modal */}
        {showMobileDetail && selectedClient && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowMobileDetail(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto shadow-[0px_-4px_14px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-roboto font-bold text-xl text-[#333333]">
                  Client Details
                </h2>
                <button
                  onClick={() => setShowMobileDetail(false)}
                  className="p-2"
                >
                  <svg
                    className="w-6 h-6 text-[#666666]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0078BD] to-[#00A3FF] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-roboto font-semibold text-lg text-[#333333]">
                      {selectedClient.name}
                    </h3>
                    <TypeBadge type={selectedClient.type} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Status" value={selectedClient.status} />
                  <InfoItem label="Phone" value={selectedClient.phone} />
                </div>

                <InfoItem label="Email" value={selectedClient.email} />

                {selectedClient.services &&
                  selectedClient.services.length > 0 && (
                    <div>
                      <p className="font-inter text-xs text-[rgba(51,51,51,0.7)] mb-2">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.services.map((service, idx) => (
                          <ServiceBadge key={idx} service={service} />
                        ))}
                      </div>
                    </div>
                  )}

                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-[#0078BD] text-white rounded-lg font-roboto font-medium">
                    Contact
                  </button>
                  <button className="flex-1 py-3 bg-[rgba(0,120,189,0.07)] text-[#0078BD] rounded-lg font-roboto font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Modal for View Details */}
        {selectedClient && (
          <div
            className={`hidden md:fixed md:inset-0 md:z-50 md:flex md:items-center md:justify-center ${selectedClient && !showMobileDetail ? "md:flex" : "md:hidden"}`}
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSelectedClient(null)}
            />
            <div className="relative bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-[0px_4px_14px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-roboto font-bold text-xl text-[#333333]">
                  Client Details
                </h2>
                <button onClick={() => setSelectedClient(null)} className="p-2">
                  <svg
                    className="w-6 h-6 text-[#666666]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0078BD] to-[#00A3FF] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-roboto font-semibold text-lg text-[#333333]">
                      {selectedClient.name}
                    </h3>
                    <TypeBadge type={selectedClient.type} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Status" value={selectedClient.status} />
                  <InfoItem label="Phone" value={selectedClient.phone} />
                </div>

                <InfoItem label="Email" value={selectedClient.email} />

                {selectedClient.services &&
                  selectedClient.services.length > 0 && (
                    <div>
                      <p className="font-inter text-xs text-[rgba(51,51,51,0.7)] mb-2">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.services.map((service, idx) => (
                          <ServiceBadge key={idx} service={service} />
                        ))}
                      </div>
                    </div>
                  )}

                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-3 bg-[#0078BD] text-white rounded-lg font-roboto font-medium">
                    Contact
                  </button>
                  <button className="flex-1 py-3 bg-[rgba(0,120,189,0.07)] text-[#0078BD] rounded-lg font-roboto font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats - Figma style */}
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:gap-4 lg:gap-6">
          <SummaryCard label="Total" value={clients.length} color="blue" />
          <SummaryCard label="Enterprise" value={enterpriseCount} color="red" />
          <SummaryCard label="Premium" value={premiumCount} color="yellow" />
          <SummaryCard label="Standard" value={standardCount} color="gray" />
        </div>
      </div>
    </div>
  );
}

// Info item for detail modals
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="font-inter text-xs text-[rgba(51,51,51,0.7)]">{label}</p>
      <p className="font-inter text-sm font-medium text-[#333333]">{value}</p>
    </div>
  );
}

// Stats Card - Matching Figma exactly
function StatsCard({ label, value, icon, color }) {
  const colors = {
    blue: "bg-[rgba(0,120,189,0.06)] text-[#0078BD] border-[#0078BD]",
    green: "bg-[rgba(20,174,92,0.06)] text-[#14AE5C] border-[#14AE5C]",
    red: "bg-[rgba(221,54,40,0.06)] text-[#DD3628] border-[#DD3628]",
    yellow: "bg-[rgba(255,174,76,0.06)] text-[#FFAE4C] border-[#FFAE4C]",
  };

  return (
    <div
      className={`${colors[color]} rounded-lg p-2 sm:p-3 lg:p-4 border bg-white`}
    >
      <p className="font-inter text-[rgba(51,51,51,0.7)] text-xs truncate">
        {label}
      </p>
      <div className="flex items-center justify-between mt-1">
        <p className="font-roboto font-bold text-base sm:text-lg lg:text-xl">
          {value}
        </p>
        <span className="text-lg sm:text-xl lg:text-2xl">{icon}</span>
      </div>
    </div>
  );
}

// Summary Card - Figma style
function SummaryCard({ label, value, color }) {
  const colors = {
    blue: "bg-[rgba(0,120,189,0.06)] border-[#0078BD] text-[#0078BD]",
    red: "bg-[rgba(221,54,40,0.06)] border-[#DD3628] text-[#DD3628]",
    yellow: "bg-[rgba(255,174,76,0.06)] border-[#FFAE4C] text-[#FFAE4C]",
    gray: "bg-[#FAFAFC] border-[#E6E6E6] text-[#666666]",
    green: "bg-[rgba(20,174,92,0.06)] border-[#14AE5C] text-[#14AE5C]",
  };

  return (
    <div
      className={`${colors[color]} p-2 sm:p-3 lg:p-4 rounded-lg shadow-[0px_2px_16px_#E3EBFC] border bg-white`}
    >
      <p className="font-inter text-xs sm:text-sm font-medium truncate">
        {label}
      </p>
      <p className="font-roboto font-bold text-base sm:text-lg lg:text-xl mt-1">
        {value}
      </p>
    </div>
  );
}

// Type badge - Figma style
function TypeBadge({ type }) {
  const types = {
    Enterprise: "bg-[rgba(221,54,40,0.06)] text-[#DD3628]",
    Premium: "bg-[rgba(255,174,76,0.06)] text-[#FFAE4C]",
    Standard: "bg-[#FAFAFC] text-[#666666]",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-roboto font-medium ${types[type] || "bg-[#FAFAFC] text-[#666666]"}`}
    >
      {type}
    </span>
  );
}

// Service badge - Figma style
function ServiceBadge({ service }) {
  const colors = {
    Seo: "bg-[rgba(255,174,76,0.06)] text-[#FFAE4C]",
    "UI/UX Design": "bg-[rgba(221,54,40,0.06)] text-[#DD3628]",
    "Web Development": "bg-[rgba(0,120,189,0.06)] text-[#0078BD]",
    Consulting: "bg-[rgba(20,174,92,0.06)] text-[#14AE5C]",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-roboto font-medium ${colors[service] || "bg-[#FAFAFC] text-[#666666]"}`}
    >
      {service}
    </span>
  );
}
