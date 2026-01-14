import React from "react";

/**
 *
 * @property {string} appName - The name of your application to display.
 */

const LoadingDashboard: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>

        <p className="text-lg font-medium text-gray-500">
          Loading dashboard...
        </p>
      </div>
    </div>
  );
};

export default LoadingDashboard;
