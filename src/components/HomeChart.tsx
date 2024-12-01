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

const HomeChart = ({ 
  data, 
  lines,
  xAxisKey,
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
            right: 20,
            left: 20,
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
          {
            lines.map((line: any) => (
              <Line 
                type="monotone" 
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                dot={false}
                strokeWidth={1}
              />
            ))
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomeChart;