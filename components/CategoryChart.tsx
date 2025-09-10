
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CategoryBreakdown } from '../types';

interface CategoryChartProps {
  data: CategoryBreakdown[];
  title: string;
  barColor?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CategoryChart: React.FC<CategoryChartProps> = ({ data, title, barColor = "#8884d8" }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={80} tick={{ fontSize: 12 }} />
            <Tooltip
                formatter={(value, name, props) => [`${value} ${props.payload.unit}`, "Value"]}
                cursor={{fill: 'rgba(239, 246, 255, 0.7)'}}
            />
            <Bar dataKey="value" name="">
                 {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColor || COLORS[index % COLORS.length]} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
