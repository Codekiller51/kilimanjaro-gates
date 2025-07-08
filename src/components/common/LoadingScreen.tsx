import React from 'react';
import { Mountain, Plane, Camera, Compass } from 'lucide-react';

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
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Mountain className="h-12 w-12 text-white animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold">Kilimanjaro Gates</h1>
          </div>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Your Gateway to Tanzania's Adventures
          </p>
        </div>

        {/* Animated Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="animate-bounce delay-100">
            <Plane className="h-8 w-8 text-white opacity-80" />
          </div>
          <div className="animate-bounce delay-300">
            <Camera className="h-8 w-8 text-white opacity-80" />
          </div>
          <div className="animate-bounce delay-500">
            <Compass className="h-8 w-8 text-white opacity-80" />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
          </div>
          <p className="text-lg font-medium opacity-90">
            Preparing your adventure...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full animate-pulse" style={{
              animation: 'loading 2s ease-in-out infinite'
            }}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0% }
          50% { width: 70% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;