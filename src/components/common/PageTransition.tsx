import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, isLoading }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white flex items-center justify-center z-40"
        >
          <div className="text-center">
            {/* Mini Spinning Globe */}
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16">
                {/* Globe Base */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-500 animate-spin-slow shadow-lg">
                  {/* Continents */}
                  <div className="absolute top-2 left-3 w-4 h-3 bg-green-600 rounded-full opacity-80"></div>
                  <div className="absolute top-4 right-2 w-3 h-2 bg-green-600 rounded-full opacity-80"></div>
                  <div className="absolute bottom-3 left-4 w-5 h-2 bg-green-600 rounded-full opacity-80"></div>
                  <div className="absolute bottom-4 right-3 w-2 h-3 bg-green-600 rounded-full opacity-80"></div>
                  
                  {/* Highlight */}
                  <div className="absolute top-1 left-2 w-3 h-3 bg-white rounded-full opacity-30 blur-sm"></div>
                </div>
                
                {/* Rotating Ring */}
                <div className="absolute inset-0 rounded-full border-t-2 border-orange-600 animate-spin"></div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-orange-600 font-semibold text-lg mb-4">Loading...</div>
            
            {/* Loading Dots */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;