import React from "react";

const SpinnerLoading = () => (
  <div className="flex justify-center items-center h-48">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
    <span className="text-lg text-gray-600">Loading data...</span>
  </div>
);

const SkeletonBerkasDetail = () => {
  const dummyRows = [1, 2, 3, 4, 5, 6, 7, 8];
  const documentRows = [1, 2, 3, 4, 5];

  return (
    <div className="max-w-6xl mx-auto p-6 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="w-24 h-6 bg-gray-200 rounded"></div>
      </div>

      <div className="w-80 h-8 bg-gray-300 rounded mb-6"></div>

      <div className="overflow-hidden border border-gray-100 shadow-sm rounded-xl mb-10">
        <table className="w-full text-sm">
          <tbody className="divide-y">
            {dummyRows.map((i) => (
              <tr key={i}>
                <td className="px-6 py-3 w-1/2">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-3">
                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Table Skeleton */}
      <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-gray-700 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="w-32 h-3 bg-blue-100 rounded"></div>
              </th>
              <th className="px-6 py-3 text-center">
                <div className="w-16 h-3 bg-blue-100 rounded mx-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {documentRows.map((i) => (
              <tr key={`doc-${i}`}>
                <td className="px-6 py-3">
                  <div className="w-40 h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-3 flex justify-center gap-3">
                  <div className="w-16 h-8 bg-yellow-200 rounded-lg"></div>
                  <div className="w-16 h-8 bg-red-200 rounded-lg"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { SpinnerLoading, SkeletonBerkasDetail };
