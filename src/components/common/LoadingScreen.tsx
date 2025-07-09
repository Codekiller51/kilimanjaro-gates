import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-400 flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 border-2 border-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="text-center text-white relative z-10">
        {/* Logo and Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kilimanjaro Gates</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Your Gateway to Tanzania's Adventures
          </p>
        </div>

        {/* Spinning Globe */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            {/* Globe Base */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 animate-spin-slow shadow-2xl">
              {/* Continents */}
              <div className="absolute top-4 left-6 w-8 h-6 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute top-8 right-4 w-6 h-4 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute bottom-6 left-8 w-10 h-5 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute bottom-8 right-6 w-4 h-6 bg-green-600 rounded-full opacity-80"></div>
              
              {/* Highlight */}
              <div className="absolute top-2 left-4 w-6 h-6 bg-white rounded-full opacity-30 blur-sm"></div>
            </div>
            
            {/* Orbit Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white border-opacity-30 animate-pulse"></div>
            
            {/* Rotating Ring */}
            <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
          </div>
          <p className="text-lg font-medium opacity-90">
            Preparing your adventure...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;