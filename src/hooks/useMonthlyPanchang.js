import { useState, useEffect, useCallback } from 'react';
import { getMonthlyPanchang } from '../services/panchangApi';
import { useLocationContext } from '../context/LocationContext';

export function useMonthlyPanchang(month, year) {
  const { selectedLocation } = useLocationContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!month || !year || !selectedLocation) return;
    setLoading(true);
    setError(null);

    try {
      const result = await getMonthlyPanchang(
        month,
        year,
        selectedLocation.latitude,
        selectedLocation.longitude
      );
      setData(result);
    } catch (err) {
      console.error('Failed to fetch monthly panchang:', err);
      setError('Unable to load monthly calendar. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [month, year, selectedLocation?.latitude, selectedLocation?.longitude]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
