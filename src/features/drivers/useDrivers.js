import { useState, useEffect } from 'react';
import { getDriversAPI, getDriversStatsAPI } from './driversAPI';

// Hook to get all drivers
export function useDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await getDriversAPI();
      
      // response.data is the array
      setDrivers(response.data);
      setError(null);
    } catch (err) {
      console.error('Drivers error:', err);
      setError(err);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  return { drivers, loading, error, refetch: fetchDrivers };
}

// Hook to get driver stats
export function useDriverStats(startDate, endDate) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getDriversStatsAPI(startDate, endDate);
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error('Stats error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [startDate, endDate]);

  return { stats, loading, error };
}