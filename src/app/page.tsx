'use client'

import HomeChart from '@/components/HomeChart'
import { useOriginData } from '@/hooks/useOriginData';
import { useEffect, useState } from 'react';

function Page() {

  const [chartData, setChartData] = useState<any>([]);

  const { originData, error, loading } = useOriginData('/HS300.csv');

  const lines = [
    { key: 'close', name: '沪深300', color: '#2563eb' },
    { key: 's1', name: '沪深300 + 500', color: '#059669' },
  ];

  useEffect(() => {
    if (originData && originData.length > 0) {
      const processedData = originData.map((item: { close: number; }) => ({
        ...item,
        s1: item.close + 500
      }));
      setChartData(processedData);
    }
  }, [originData]);

  if (loading) {
    return <div className="p-4">Loading data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className='p-4'>
      <HomeChart
        data={chartData}
        lines={lines}
        xAxisKey = "date"
      />
    </div>
  );
}

export default Page;
