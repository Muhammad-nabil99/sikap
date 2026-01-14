export interface Notification {
  id: number;
  notifikasi: number;
  pesan: string;
}

async function notificationAPI(): Promise<Notification[]> {
  const newNotification: Notification[] = [
    { id: 1, notifikasi: 1, pesan: "kenaikan pangkat akan berakhir dalam 1 lagi" },
    { id: 2, notifikasi: 1, pesan: "kenaikan pangkat akan berakhir dalam 2 lagi" },
    { id: 3, notifikasi: 1, pesan: "kenaikan pangkat akan berakhir dalam 3 lagi" },
    { id: 4, notifikasi: 1, pesan: "kenaikan pangkat akan berakhir dalam 4 lagi" },
    { id: 5, notifikasi: 1, pesan: "kenaikan pangkat akan berakhir dalam 5 lagi" },
    { id: 6, notifikasi: 1, pesan: "kenaikan pangkat akan berakhir dalam 6 lagi" },
  ];

  if (!newNotification.length) {
    throw new Error("notifikasi kosong");
  }

  return new Promise((resolve, reject) => {
    if (!newNotification.length) {
      reject("error");
    }
    resolve(newNotification);
  });
}

export default notificationAPI;
