import { useState, useEffect, useCallback } from 'react';
import { getDailyPanchang } from '../services/panchangApi';
import { useLocationContext } from '../context/LocationContext';
import { formatDateYMD } from '../utils/dateUtils';

export function usePanchang(date = new Date()) {
  const { selectedLocation } = useLocationContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formattedDate = formatDateYMD(date);

  const fetchData = useCallback(async () => {
    if (!formattedDate || !selectedLocation) return;
    setLoading(true);
    setError(null);

    try {
      const result = await getDailyPanchang(
        formattedDate,
        selectedLocation.latitude,
        selectedLocation.longitude
      );
      setData(result);
    } catch (err) {
      console.error('Failed to fetch panchang data:', err);
      setError(err.message || 'Unable to load Panchang data. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  }, [formattedDate, selectedLocation?.latitude, selectedLocation?.longitude]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    formattedDate
  };
}
