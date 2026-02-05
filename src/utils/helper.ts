import useGetSK from "@/features/SK/useGetSK";

export const listGolonganRuang = [
  "I/A",
  "I/B",
  "I/C",
  "I/D",
  "II/A",
  "II/B",
  "II/C",
  "II/D",
  "III/A",
  "III/B",
  "III/C",
  "III/D",
  "IV/A",
  "IV/B",
  "IV/C",
  "IV/D",
  "IV/E",
];

export function colorindicatorStatus(status) {
  if (status === "selesai") {
    return "bg-green-100 text-green-700";
  }
  if (status === "terkirim") {
    return "bg-yellow-100 text-yellow-700";
  }
  if (status === "diproses") {
    return "bg-blue-100 text-blue-700";
  }
  if (status === "ditolak") {
    return "bg-red-100 text-red-700";
  }
}
export function shortenName<User>(user: User) {
  if (`${user}`?.length < 1) return "User";
  if (`${user}`.split(" ")?.length == 1) {
    return `${user}`.split("")?.slice(0, 2);
  }

  return `${user}`
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((item) => item?.[0])
    ?.join("");
}

export function golonganRuang(ruang: string) {
  const pangkatLama = [
    "Juru Muda",
    "Juru Muda Tingkat I",
    "Juru",
    "Juru Tingkat I",
    "Pengatur Muda",
    "Pengatur Muda Tingkat I",
    "Pengatur",
    "Pengatur Tingkat I",
    "Penata Muda",
    "Penata Muda Tingkat I",
    "Penata",
    "Penata Tingkat I",
    "Pembina",
    "Pembina Tingkat I",
    "Pembina Utama Muda",
    "Pembina Utama Madya",
    "Pembina Utama",
  ];
  const findIndex = listGolonganRuang.findIndex(
    (item) => item?.toLowerCase() == `${ruang}`?.toLowerCase(),
  );

  return { pangkat: pangkatLama[findIndex] };
}

export function updateGolonganRuang(golongan_ruang) {
  return listGolonganRuang.findIndex(
    (golongan) => golongan?.toLowerCase() == `${golongan_ruang}`?.toLowerCase(),
  );
}
export function CAN_I_UPLOAD() {
  const { SK, isLoadingSK } = useGetSK();
  if (isLoadingSK || !SK?.data?.length) {
    return {
      canUpload: false,
      promotionDate: null,
      uploadEnabledDate: null,
      isLoading: true,
    };
  }
  const TMT_GOLONGAN = new Date(SK?.data?.[0]?.tmt_golongan);
  const PROMOTION_DATE = new Date(TMT_GOLONGAN);
  PROMOTION_DATE.setFullYear(PROMOTION_DATE.getFullYear() + 4);
  // Subtract 3 months to get the date when upload should be enabled
  const UPLOAD_ENABLED_DATE = new Date(PROMOTION_DATE);
  UPLOAD_ENABLED_DATE.setMonth(UPLOAD_ENABLED_DATE.getMonth() - 3);
  // Check if current date is on or after the upload enabled date
  const TODAY = new Date();
  return {
    CAN_UPLOAD: TODAY <= UPLOAD_ENABLED_DATE,
    PROMOTION_DATE,
    UPLOAD_ENABLED_DATE,
    isLoadingSK: false,
  };
}

export function UPLOAD_NEW_DOCUMENT() {}
