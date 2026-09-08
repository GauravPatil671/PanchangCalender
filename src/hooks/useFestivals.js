import { useState, useEffect } from 'react';
import { getFestivals } from '../services/panchangApi';

export function useFestivals(month = null, year = null) {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const list = await getFestivals(month, year);
        if (isMounted) setFestivals(list);
      } catch (err) {
        if (isMounted) setError('Unable to load festival calendar.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [month, year]);

  return { festivals, loading, error };
}
