// src/components/DataDiriSkeleton.tsx

import React from "react";

const SKSkeleton: React.FC = () => {
  // A reusable skeleton placeholder for input fields
  const InputSkeleton = () => (
    <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
  );

  // A reusable skeleton placeholder for text lines (like titles or labels)
  const TextSkeleton = ({ width = "w-3/4" }) => (
    <div className={`h-4 bg-gray-200 rounded-sm animate-pulse ${width}`}></div>
  );

  return (
    <div className="p-8 bg-white max-w-4xl mx-auto">
      {/* Skeleton for Main Title */}
      <div className="flex flex-col items-center mb-10">
        <TextSkeleton width="w-72" />{" "}
        {/* Mimics "Formulir Data Diri Pegawai" */}
        <div className="mt-4"></div> {/* Spacer */}
        <TextSkeleton width="w-96" /> {/* Mimics subtitle */}
      </div>

      {/* Grid Layout for Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1 */}
        <div>
          <TextSkeleton width="w-2/3" /> {/* Label: TMT Golongan */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>
        <div>
          <TextSkeleton width="w-2/3" /> {/* Label: Jenis Kenaikan Pangkat */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>
        <div>
          <TextSkeleton width="w-2/3" />{" "}
          {/* Label: Masa Kerja Golongan (Bulan) */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>

        {/* Row 2 */}
        <div>
          <TextSkeleton width="w-2/3" /> {/* Label: Golongan/Ruang */}
          <div className="mt-2"></div>
          <InputSkeleton /> {/* This can also be a dropdown skeleton */}
        </div>
        <div>
          <TextSkeleton width="w-2/3" />{" "}
          {/* Label: Masa Kerja Golongan (Tahun) */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>
        <div>
          <TextSkeleton width="w-2/3" /> {/* Label: Nomor SK */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>

        {/* Row 3 */}
        <div>
          <TextSkeleton width="w-2/3" /> {/* Label: Tanggal SK */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>
        <div>
          <TextSkeleton width="w-2/3" /> {/* Label: Nomor Pertek BKN */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>
        <div>
          <TextSkeleton width="w-2/3" /> {/* Label: Tanggal Pertek BKN */}
          <div className="mt-2"></div>
          <InputSkeleton />
        </div>
      </div>

      <div className="flex justify-center mt-12 space-x-4">
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>{" "}
        <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>{" "}
      </div>
    </div>
  );
};

export default SKSkeleton;
