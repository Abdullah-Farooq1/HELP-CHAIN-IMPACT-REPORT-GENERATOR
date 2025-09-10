
import React from 'react';
import Header from './components/Header';
import ReportGenerator from './components/ReportGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ReportGenerator />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} HelpChain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
