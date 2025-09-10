
import React, { useState, useCallback } from 'react';
import { generateImpactReport } from '../services/geminiService';
import { ImpactReportData } from '../types';
import ImpactReport from './ImpactReport';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const defaultData = `
Donation,50,USD,Medicine,John D.
Request,Fulfilled,Shelter,Family of 4,Volunteer Team A
Volunteer Hours,8,Shelter,Team A
Donation,200,USD,Food,Jane S.
Request,Fulfilled,Food,Community Kitchen,Volunteer Team B
Volunteer Hours,16,Food,Team B
Donation,150,USD,Shelter,Anonymous
Request,Fulfilled,Medicine,Elderly couple,Volunteer Team C
Volunteer Hours,4,Medicine,Team C
Donation,75,USD,Education,Mike T.
Request,Fulfilled,Education,School supplies for 10 kids,Volunteer Team D
Volunteer Hours,12,Education,Team D
`;

const ReportGenerator: React.FC = () => {
  const [rawData, setRawData] = useState<string>(defaultData.trim());
  const [report, setReport] = useState<ImpactReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = useCallback(async () => {
    if (!rawData.trim()) {
      setError("Please enter some data to generate a report.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const generatedReport = await generateImpactReport(rawData);
      setReport(generatedReport);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [rawData]);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Paste Your Raw Data</h2>
        <p className="text-gray-600 mb-4">
          Enter your operational data below. Include details like donation amounts, request categories, and volunteer hours. The AI will analyze this data to create a structured report.
        </p>
        <textarea
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
          placeholder="e.g., Donation,100,USD,Food,Jane Doe..."
          className="w-full h-60 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out font-mono text-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Generating Report...</span>
            </>
          ) : (
            'Generate Impact Report'
          )}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      
      {report && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">2. Generated Impact Report</h2>
            <ImpactReport data={report} />
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
