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
    (item) => item?.toLowerCase() == `${ruang}`?.toLowerCase()
  );

  return { pangkat: pangkatLama[findIndex] };
}

export function updateGolonganRuang(golongan_ruang) {
  return listGolonganRuang.findIndex(
    (golongan) => golongan?.toLowerCase() == `${golongan_ruang}`?.toLowerCase()
  );
}
