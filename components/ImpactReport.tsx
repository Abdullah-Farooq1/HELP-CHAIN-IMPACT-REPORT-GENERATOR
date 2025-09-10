
import React from 'react';
import { ImpactReportData } from '../types';
import StatCard from './StatCard';
import CategoryChart from './CategoryChart';

interface ImpactReportProps {
  data: ImpactReportData;
}

const BulletPointList: React.FC<{ items: string[]; title: string; icon: JSX.Element }> = ({ items, title, icon }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
        </h3>
        <ul className="space-y-2 list-inside">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


const ImpactReport: React.FC<ImpactReportProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-dark">{data.reportTitle}</h2>
        <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">{data.executiveSummary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Donations" value={`$${data.keyMetrics.totalDonations.toLocaleString()}`} />
        <StatCard label="Requests Fulfilled" value={data.keyMetrics.requestsFulfilled.toLocaleString()} />
        <StatCard label="Volunteer Hours" value={`${data.keyMetrics.volunteerHours.toLocaleString()} hrs`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CategoryChart data={data.donationsByCategory} title="Donations by Category" barColor="#34d399" />
        <CategoryChart data={data.requestsByCategory} title="Requests by Category" barColor="#60a5fa" />
        <CategoryChart data={data.volunteerHoursByCategory} title="Volunteer Hours by Category" barColor="#facc15" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <BulletPointList 
            title="Key Achievements" 
            items={data.achievements} 
            icon={<svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
        />
        <BulletPointList 
            title="Suggestions for Improvement" 
            items={data.suggestions}
            icon={<svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
        />
      </div>

    </div>
  );
};

export default ImpactReport;
