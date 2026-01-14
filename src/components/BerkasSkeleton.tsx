// BerkasSkeleton.tsx

import React from "react";

const shimmer = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md";
const skeletonButton = `${shimmer} h-8 w-24`;

const BerkasSkeleton: React.FC = () => {
  // Number of skeleton rows to show
  const skeletonRows = [1, 2, 3];
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Back Button Skeleton */}
        <div className={`${shimmer} h-6 w-20 sm:w-24`}></div>
        
        {/* Add Button Skeleton (optional) */}
        <div className={`${shimmer} h-9 sm:h-10 w-full sm:w-32`}></div>
      </div>

      {/* Title Skeleton */}
      <div className="mb-4 sm:mb-6">
        <div className={`${shimmer} h-6 sm:h-7 md:h-8 w-48 sm:w-64`}></div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 lg:px-6 py-3">
                <div className={`${shimmer} h-4 w-16 mx-auto`}></div>
              </th>
              <th className="px-4 lg:px-6 py-3">
                <div className={`${shimmer} h-4 w-16 mx-auto`}></div>
              </th>
              <th className="px-4 lg:px-6 py-3">
                <div className={`${shimmer} h-4 w-24 mx-auto`}></div>
              </th>
              <th className="px-4 lg:px-6 py-3">
                <div className={`${shimmer} h-4 w-20 mx-auto`}></div>
              </th>
              <th className="px-4 lg:px-6 py-3">
                <div className={`${shimmer} h-4 w-32 mx-auto`}></div>
              </th>
              <th className="px-4 lg:px-6 py-3">
                <div className={`${shimmer} h-4 w-12 mx-auto`}></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((row) => (
              <tr
                key={row}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-100"
              >
                <td className="px-4 lg:px-6 py-3 text-center">
                  <div className="flex justify-center">
                    <div className={`${shimmer} h-8 w-28`}></div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <div className="flex justify-center">
                    <div className={`${shimmer} h-8 w-28`}></div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <div className="flex justify-center">
                    <div className={`${shimmer} h-8 w-28`}></div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <div className="flex justify-center">
                    <div className={`${shimmer} h-8 w-28`}></div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <div className="flex justify-center">
                    <div className={`${shimmer} h-8 w-28`}></div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3 text-center">
                  <div className="flex justify-center">
                    <div className={`${shimmer} h-4 w-12`}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="md:hidden space-y-4">
        {skeletonRows.map((card) => (
          <div
            key={card}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`${shimmer} h-4 w-4 rounded`}></div>
                  <div className={`${shimmer} h-4 w-32`}></div>
                </div>
                <div className={`${shimmer} h-3 w-16`}></div>
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-4 space-y-3">
              {/* SK PNS */}
              <div className="space-y-2">
                <div className={`${shimmer} h-3 w-16`}></div>
                <div className={`${shimmer} h-9 w-full`}></div>
              </div>

              {/* SK CPNS */}
              <div className="space-y-2">
                <div className={`${shimmer} h-3 w-16`}></div>
                <div className={`${shimmer} h-9 w-full`}></div>
              </div>

              {/* SK Gaji Berkala */}
              <div className="space-y-2">
                <div className={`${shimmer} h-3 w-24`}></div>
                <div className={`${shimmer} h-9 w-full`}></div>
              </div>

              {/* SK Jabatan */}
              <div className="space-y-2">
                <div className={`${shimmer} h-3 w-20`}></div>
                <div className={`${shimmer} h-9 w-full`}></div>
              </div>

              {/* SK Pangkat Terakhir */}
              <div className="space-y-2">
                <div className={`${shimmer} h-3 w-32`}></div>
                <div className={`${shimmer} h-9 w-full`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BerkasSkeleton;