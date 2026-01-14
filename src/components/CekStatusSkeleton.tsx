// src/components/CekStatusSkeleton.tsx

import React from "react";

const CekStatusSkeleton: React.FC = () => {
  // Reusable skeleton for text lines (like titles or labels)
  const TextSkeleton = ({ width = "w-3/4", height = "h-4" }) => (
    <div
      className={`bg-gray-200 rounded-sm animate-pulse ${width} ${height}`}
    ></div>
  );

  // Reusable skeleton for a status tag
  const TagSkeleton = () => (
    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div> // Mimics the size of status tags
  );

  // Number of timeline cards to display as skeletons
  const numberOfTimelineCards = 4;
  const timelineCards = Array.from({ length: numberOfTimelineCards });

  return (
    <div className="p-8 bg-white max-w-4xl mx-auto">
      {/* Skeleton for "Cek Status" title and subtitle */}
      <div className="mb-8">
        <TextSkeleton width="w-48" height="h-8" /> {/* Main title */}
        <div className="mt-2"></div>
        <TextSkeleton width="w-64" height="h-5" /> {/* Subtitle */}
      </div>

      {/* Skeleton for "Timeline Proses" section title */}
      <div className="mb-6">
        <TextSkeleton width="w-48" height="h-6" /> {/* Timeline Proses title */}
      </div>

      {/* Skeleton for each timeline event card */}
      <div className="space-y-6">
        {timelineCards.map((_, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col space-y-3"
          >
            <div className="flex justify-between items-center">
              <TextSkeleton width="w-3/5" height="h-6" /> {/* Event Title */}
              <TagSkeleton /> {/* Status Tag */}
            </div>
            <TextSkeleton width="w-1/3" height="h-4" /> {/* Date/Time */}
            <TextSkeleton width="w-full" height="h-4" />{" "}
            {/* Description line 1 */}
            <TextSkeleton width="w-11/12" height="h-4" />{" "}
            {/* Description line 2 */}
            <TextSkeleton width="w-4/5" height="h-4" />{" "}
            {/* Description line 3 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CekStatusSkeleton;
