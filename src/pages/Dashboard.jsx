import React, { useState, useEffect } from 'react';
import { getStats, getDrivers, getClients } from '../api/dashboard';
import Loader from '../components/Loader';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [activeTab, setActiveTab] = useState('driver');

  useEffect(() => {
  fetchDashboardData();
}, []);

const fetchDashboardData = async () => {
  try {
    const [statsRes, driversRes, clientsRes] = await Promise.all([
      getStats(),
      getDrivers(),
      getClients()
    ]);
    
    setStats(statsRes.data);
    setDrivers(driversRes.data || []);
    setClients(clientsRes.data || []);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};

// And update your statsData to use API data:
const statsData = {
  totalCall: stats?.totalCall || '1,245',
  totalRems: stats?.totalRems || '970',
  totalRPM: stats?.totalRPM || '2.5M',
  totalPRI: stats?.totalPRI || '450',
};
  
  if (loading) return <Loader fullScreen />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div
    className="w-[1440px] h-[780px] rounded-[20px] opacity-100 bg-white shadow-lg overflow-hidden"
    style={{ transform: 'rotate(0deg)' }}
  >
    
    <Layout />
  </div>
</div>
  );
};

export default Dashboard;