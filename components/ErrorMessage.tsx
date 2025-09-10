
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm1-4a1 1 0 011 1v3a1 1 0 11-2 0V6a1 1 0 011-1z"/></svg>
        </div>
        <div>
            <p className="font-bold">Error</p>
            <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
