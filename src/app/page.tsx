'use client'

import HomeChart from '@/components/HomeChart'
import { useOriginData } from '@/hooks/useOriginData';
import { useEffect, useState } from 'react';

function Page() {

  const [chartData, setChartData] = useState<any>([]);

  const { originData, error, loading } = useOriginData('/HS300.csv');

  const N = 10

  const lines = [
    { key: 'close', name: '沪深300', color: '#2563eb' },
    { key: 's1', name: `${N}日策略`, color: '#ff0000' },
  ];

  useEffect(() => {
    if (originData && originData.length > 0) {
      const processedData = originData.map((item: { close: number; }) => ({
        ...item,
        status1: ''
      }));
      processedData.forEach((item: any, index: number) => {
        if (index < N) {
          return
        }
        if (index === N) {
          item.status1 = processedData[0].close > item.close ? 'empty' : 'buy'
          return
        }
        if (processedData[index - 1].status1 === 'buy' || processedData[index - 1].status1 === 'hold') {
          item.status1 = processedData[index - N].close > item.close ? 'sell' : 'hold'
        } else if (processedData[index - 1].status1 === 'sell' || processedData[index - 1].status1 === 'empty') {
          item.status1 = processedData[index - N].close > item.close ? 'empty' : 'buy'
        }
      })
      console.log(processedData.filter((item: any) => item.status1 === 'sell' || item.status1 === 'buy'))
      processedData.forEach((item: any, index: number) => {
        if (item.status1 === 'buy' || item.status1 === 'empty') {
          item.s1 = processedData[index - 1].s1 || item.close
        } else if (item.status1 === 'sell' || item.status1 === 'hold') {
          item.s1 = processedData[index - 1].s1 * item.close / processedData[index - 1].close
        } else {
          item.s1 = undefined
        }
      })
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
