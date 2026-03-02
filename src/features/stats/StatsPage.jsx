import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDrivers } from '../drivers/useDrivers';
import { getClientsAPI } from '../clients/clientsAPI';
import { mockStats } from '../../services/mockData';
import Loader from '../../components/Loader';
import calls from '../../assets/icons/calls.svg';
import rems from '../../assets/icons/rems.svg';
import rpm from '../../assets/icons/rpm.svg';
import pri from '../../assets/icons/pri.svg';
import eye from '../../assets/icons/eye.svg';

export default function StatsPage() {
  const { drivers, loading: driversLoading } = useDrivers();
  
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  
  const [driverTab, setDriverTab] = useState('Active');
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    console.log('Drivers loaded:', drivers);
  }, [drivers]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setClientsLoading(true);
        const data = await getClientsAPI();
        const clientsArray = data.data || [];
        setClients(clientsArray);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setClients([]);
      } finally {
        setClientsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const togglePasswordVisibility = (driverId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [driverId]: !prev[driverId],
    }));
  };

  if (driversLoading || clientsLoading) return <Loader />;

  const activeDrivers = drivers.filter((d) => d.status === 'Active');
  const inactiveDrivers = drivers.filter((d) => d.status === 'Inactive');
  const displayedDrivers = driverTab === 'Active' ? activeDrivers : inactiveDrivers;
  const totalTrips = drivers.reduce((sum, d) => sum + (d.totalTrips || 0), 0);

  return (
    <div className="p-6 min-h-screen">
      <h2 className="font-roboto font-bold text-2xl text-[#333333] leading-[80%] -mt-6 mb-8">
        Dashboard Overview
      </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-[14px] mb-6">
          <StatCard
            title="Total Call"
            value={totalTrips.toLocaleString()}
            icon={<img src={calls} alt="calls" className="w-5 h-5" />}
          />
          <StatCard
            title="Total Rems"
            value={clients.length.toLocaleString()}
            icon={<img src={rems} alt="rems" className="w-5 h-5" />}
          />
          <StatCard
            title="Total RPM"
            value={mockStats.totalDistance?.toLocaleString() || '2.5M'}
            icon={<img src={rpm} alt="rpm" className="w-5 h-5" />}
          />
          <StatCard
            title="Total PRI"
            value={mockStats.activeDrivers?.toLocaleString() || '450'}
            icon={<img src={pri} alt="pri" className="w-5 h-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left box - Drivers list */}
          <section className="bg-white border border-[#F7F7F7] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-roboto font-medium text-xl text-[#333333]">List of Driver</h3>
              <Link 
                to="/drivers" 
                className="font-inter font-medium text-sm text-[#0078BD] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="flex gap-4 mb-4 border-b border-[#E6E6E6]">
              <button
                onClick={() => setDriverTab('Active')}
                className={`pb-2 px-4 font-roboto font-medium text-sm transition-all ${
                  driverTab === 'Active'
                    ? 'text-[#0078BD] border-b-2 border-[#0078BD]'
                    : 'text-[rgba(51,51,51,0.5)] hover:text-gray-900'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setDriverTab('Inactive')}
                className={`pb-2 px-4 font-roboto font-medium text-sm transition-all ${
                  driverTab === 'Inactive'
                    ? 'text-[#0078BD] border-b-2 border-[#0078BD]'
                    : 'text-[rgba(51,51,51,0.5)] hover:text-gray-900'
                }`}
              >
                Inactive
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FAFAFC]">
                    <th className="text-left py-2.5 px-3 font-inter font-medium text-xs text-[rgba(51,51,51,0.8)]">Name</th>
                    <th className="text-left py-2.5 px-3 font-inter font-medium text-xs text-[rgba(51,51,51,0.8)]">Email</th>
                    <th className="text-left py-2.5 px-3 font-inter font-medium text-xs text-[rgba(51,51,51,0.8)]">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedDrivers && displayedDrivers.length > 0 ? (
                    displayedDrivers.slice(0, 7).map((driver) => (
                      <tr key={driver.id} className="border-b border-[#E6E6E6] hover:bg-gray-50 transition">
                        <td className="py-2.5 px-3 font-inter font-medium text-xs text-[rgba(51,51,51,0.8)]">
                          {driver.name}
                        </td>
                        <td className="py-2.5 px-3 font-inter font-medium text-xs text-[#0078BD] hover:underline cursor-pointer">
                          {driver.email}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePasswordVisibility(driver.id)}
                              className="text-gray-500 hover:text-gray-700 transition"
                              title="Click to show/hide password"
                            >
                              <img src={eye} alt="eye" className="w-3 h-3" />
                            </button>
                            <span className="font-inter font-medium text-xs text-[rgba(51,51,51,0.8)]">
                              {visiblePasswords[driver.id] 
                                ? 'Ubk.ali@2025'
                                : '••••••••'
                              }
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-6 px-4 text-center font-inter text-sm text-gray-500">
                        No {driverTab.toLowerCase()} drivers
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Right box - Clients list - Fixed to show in one line on desktop */}
          <section className="bg-white border border-[#F7F7F7] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-roboto font-medium text-xl text-[#333333]">List of Clients</h3>
              <Link 
                to="/clients" 
                className="font-inter font-medium text-sm text-[#0078BD] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FAFAFC]">
                    <th className="text-left py-2.5 px-3 font-inter font-medium text-xs text-[rgba(51,51,51,0.8)]">Clients Name</th>
                    <th className="text-left py-2.5 px-3 font-inter font-medium text-xs text-[rgba(51,51,51,0.8)]">Services</th>
                  </tr>
                </thead>
                <tbody>
                  {clients && clients.length > 0 ? (
                    clients.slice(0, 7).map((client) => (
                      <tr key={client.id} className="border-b border-[#E6E6E6] hover:bg-gray-50 transition">
                        <td className="py-2.5 px-3 font-inter font-medium text-xs text-[rgba(51,51,51,0.8)] whitespace-nowrap">
                          {client.name}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap lg:flex-nowrap gap-2">
                            {client.services && client.services.length > 0 ? (
                              client.services.slice(0, 4).map((service, idx) => (
                                <ServiceBadge 
                                  key={`${client.id}-service-${idx}`} 
                                  service={service} 
                                />
                              ))
                            ) : (
                              <>
                                <ServiceBadge key={`${client.id}-seo`} service="Seo" />
                                <ServiceBadge key={`${client.id}-uiux`} service="UI/UX Design" />
                                <ServiceBadge key={`${client.id}-webdev`} service="Web Development" />
                                <ServiceBadge key={`${client.id}-consulting`} service="Consulting" />
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-6 px-4 text-center font-inter text-sm text-gray-500">
                        No clients
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-[0px_2px_16px_#E3EBFC]">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-roboto font-medium text-base text-[rgba(51,51,51,0.7)] mb-2">
            {title}
          </p>
          <p className="font-roboto font-bold text-xl text-[#333333]">
            {value}
          </p>
        </div>
        <div className="w-10 h-10 bg-[rgba(0,120,189,0.06)] rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ServiceBadge({ service }) {
  const getColorClass = (service) => {
    const colors = {
      'Seo': 'bg-[rgba(255,174,76,0.04)] text-[#FFAE4C]',
      'UI/UX Design': 'bg-[rgba(221,54,40,0.04)] text-[#DD3628]',
      'Web Development': 'bg-[rgba(0,120,189,0.04)] text-[#0078BD]',
      'Consulting': 'bg-[rgba(20,174,92,0.04)] text-[#14AE5C]',
    };
    return colors[service] || 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getColorClass(service)}`}>
      {service}
    </span>
  );
}