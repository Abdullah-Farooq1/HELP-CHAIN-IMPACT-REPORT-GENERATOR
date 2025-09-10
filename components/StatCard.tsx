
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow text-center border border-gray-200">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-primary">{value}</p>
    </div>
  );
};

export default StatCard;
