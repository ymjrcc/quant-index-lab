import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export function useOriginData(url: string) {
  const [originData, setOriginData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const reader = await response.text();
        
        Papa.parse(reader, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setOriginData(results.data);
            setLoading(false);
          },
          error: (error: { message: any; }) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (error) {
        setError('Failed to fetch CSV file');
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { originData, error, loading };
}