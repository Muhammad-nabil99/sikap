import React from 'react';

// Tailwind CSS utility class untuk animasi shimmer
// Pastikan Anda telah mengkonfigurasi animasi 'shimmer' di tailwind.config.js
// Contoh konfigurasi di tailwind.config.js:
/*
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundColor: 'hsl(0, 0%, 90%)' },
          '50%': { backgroundColor: 'hsl(0, 0%, 95%)' },
          '100%': { backgroundColor: 'hsl(0, 0%, 90%)' },
        },
      },
    },
  },
*/

// Props opsional jika Anda ingin mengontrol kondisi loading
interface DashboardSkeletonProps {
  isLoading?: boolean;
}

const SkeletonDashboardLoading: React.FC<DashboardSkeletonProps> = ({ isLoading = true }) => {
  if (!isLoading) {
    return null; // Tidak menampilkan skeleton jika tidak dalam keadaan loading
  }

  // Komponen pembantu untuk membuat garis skeleton
  const SkeletonLine: React.FC<{ w: string; h: string; rounded?: boolean }> = ({ w, h, rounded = true }) => (
    <div className={`bg-gray-200 animate-shimmer ${w} ${h} ${rounded ? 'rounded-md' : ''}`}></div>
  );

  // Data untuk kotak fitur bawah (2 status cards)
  const featureBoxes = [1, 2];

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-0">
      {/* HEADER SECTION (WelcomeCard) */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0">
            {/* Avatar Lingkaran */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-400 border-4 border-blue-300 animate-pulse"></div>
          </div>
          
          <div className="space-y-2 flex-1 w-full sm:w-auto">
            {/* Teks "Selamat Datang Kembali!" */}
            <SkeletonLine w="w-48 sm:w-64" h="h-6 sm:h-8" />
            
            {/* Nama */}
            <SkeletonLine w="w-32 sm:w-40" h="h-5 sm:h-6" />
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
              {/* Status Aktif */}
              <SkeletonLine w="w-20" h="h-4 sm:h-5" rounded />
              {/* NIP */}
              <SkeletonLine w="w-32 sm:w-40" h="h-4 sm:h-5" />
              {/* Tombol Kepegawaian */}
              <SkeletonLine w="w-28" h="h-4 sm:h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION (Hidden by default in actual component, but keeping for consistency) */}
      {/* Uncomment if needed:
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="p-4 sm:p-5 bg-white rounded-xl shadow-md space-y-2 sm:space-y-3">
            <SkeletonLine w="w-3/4" h="h-3 sm:h-4" />
            <SkeletonLine w="w-1/3" h="h-8 sm:h-10" />
            <SkeletonLine w="w-1/2" h="h-3" />
          </div>
        ))}
      </div>
      */}

      {/* MAIN STATUS CARDS SECTION (2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {featureBoxes.map((index) => (
          <div key={index} className="p-4 sm:p-6 bg-white rounded-xl shadow-md space-y-3 sm:space-y-4">
            <div className="flex justify-between items-start">
              {/* Ikon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-200 animate-pulse"></div>
              {/* Status Badge */}
              <SkeletonLine w="w-16 sm:w-20" h="h-5 sm:h-6" />
            </div>

            {/* Judul Fitur */}
            <SkeletonLine w="w-full sm:w-3/4" h="h-5 sm:h-6" />
            
            {/* Deskripsi */}
            <div className="space-y-2">
              <SkeletonLine w="w-full" h="h-4" />
              <SkeletonLine w="w-5/6 sm:w-11/12" h="h-4" />
            </div>
            
            {/* Date/Footer Info */}
            <div className="pt-2">
              <SkeletonLine w="w-32 sm:w-40" h="h-4" />
            </div>
            
            {/* Tombol (untuk card pertama) */}
            {index === 1 && (
              <div className="pt-2 sm:pt-4">
                <SkeletonLine w="w-full" h="h-9 sm:h-10" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonDashboardLoading;