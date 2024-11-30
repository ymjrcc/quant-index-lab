import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const StockChart = ({ 
  data, 
  height = 500,
  line1Key,
  line2Key,
  line3Key,
  line1Name,
  line2Name,
  line3Name,
  line1Color,
  line2Color,
  line3Color,
  xAxisKey,
  title,
}: any) => {
  if (!data || data.length === 0) {
    return <div className="w-full h-96 flex items-center justify-center">暂无数据</div>;
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 50,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
          />
          <Line 
            type="monotone" 
            dataKey={line1Key}
            name={line1Name}
            stroke={line1Color}
            dot={false}
            strokeWidth={1}
          />
          <Line 
            type="monotone" 
            dataKey={line2Key}
            name={line2Name}
            stroke={line2Color}
            dot={false}
            strokeWidth={1}
          />
          <Line 
            type="monotone" 
            dataKey={line3Key}
            name={line3Name}
            stroke={line3Color}
            dot={false}
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;