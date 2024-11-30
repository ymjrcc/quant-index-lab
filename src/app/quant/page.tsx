'use client'

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import StockChart from '@/components/StockChart';
import { calcQuantList } from '@/utils/calc'

const CSVReader = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sh.000300.csv');
        const reader = await response.text();
        
        Papa.parse(reader, {
          header: true,
          dynamicTyping: true, // 自动转换数字
          complete: (results) => {
            
            setData(results.data.slice(-2191));
            setLoading(false);
            
            const _stockData = results.data.map((row: any) => ({
              date: row.date,
              value: row.close,
              a20: row.a20,
              a50: row.a50,
            })).slice(-2191);
            // console.log('CSV data:', _stockData);

            setStockData(_stockData);

            // Find crossover points between value and a20
            const result: string[] = [];
            for (let i = 1; i < _stockData.length; i++) {
              const prevDiff = _stockData[i-1].value - _stockData[i-1].a20;
              const currDiff = _stockData[i].value - _stockData[i].a20;
              
              // Check if crossed from above to below or below to above
              if ((prevDiff > 0 && currDiff < 0) || (prevDiff < 0 && currDiff > 0)) {
                result.push(_stockData[i].date);
              }
            }
            // console.log('a20 Crossover dates:', result);

            // Find crossover points between value and a50
            const result2: string[] = [];
            for (let i = 1; i < _stockData.length; i++) {
              const prevDiff = _stockData[i-1].value - _stockData[i-1].a50;
              const currDiff = _stockData[i].value - _stockData[i].a50;
              if ((prevDiff > 0 && currDiff < 0) || (prevDiff < 0 && currDiff > 0)) {
                result2.push(_stockData[i].date);
              }
            }
            // console.log('a50 Crossover dates:', result2);

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
  }, []);

  useEffect(() => {
    if(data.length===0) return
    const result = calcQuantList(stockData).filter(i => i.action !== 'hold')
    // result.forEach((item: any) => {
    //   console.log(item.date, item.action);
    // })
    
  }, [stockData])

  if (loading) {
    return <div className="p-4">Loading data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <StockChart 
        data={stockData}
        height={500}
        line1Key="value"
        line2Key="s50"
        line3Key="a50"
        line1Name="沪深300"
        line2Name="策略"
        line3Name="50日均线"
        line1Color="#2563eb"
        line2Color="#ff0000"
        line3Color="#00ff00"
        xAxisKey = "date"
        title="沪深300指数"
      />
      <h2 className="text-xl font-bold mb-4">沪深300指数数据</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(data[0] || {}).map((header) => (
                <th key={header} className="px-4 py-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                {Object.values(row).map((value: any, i) => (
                  <td key={i} className="px-4 py-2 border">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-gray-600">
        Showing first 10 rows of {data.length} total rows
      </div>
    </div>
  );
};

export default CSVReader;