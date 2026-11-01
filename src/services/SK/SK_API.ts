import { BASE_URL } from "@/utils/config";

export interface SK {
  success: string;
  data: Data;
  message: string;
}
export interface Data {
  tmt_golongan: string;
  masa_gk_bulanan: string;
  golongan_ruang: string;
  masa_gk_tahunan: number;
  tanggal_lahir: string;
  nomor_sk: string;
  jenis_kp: string;
  tanggal_sk: string;
  nomor_pertek_bkn: string;
  tanggal_pertek_bkn: string;
}

export interface CreateSKData {
  tmt_golongan: string;
  masa_gk_bulanan: string;
  golongan_ruang: string;
  masa_gk_tahunan: number;
  nomor_sk: string;
  jenis_kp: string;
  tanggal_sk: string;
  nomor_pertek_bkn: string;
  tanggal_pertek_bkn: string;
  pangkat: string;
  gaji_pokok: number;
}

export async function getSK_API() {
  const getToken = localStorage.getItem("token");
  if (!getToken) return null;
  const token = JSON.parse(getToken);
  try {
    const response = await fetch(`${BASE_URL}/pegawai/data-diri`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to retrive data-diri");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("tidak dapat melakukan data diri");
    return null;
  }
}
export async function deleteSK_API(id: number) {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);
  try {
    await fetch(`${BASE_URL}/pegawai/data-diri/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("tidak dapat menghapus data diri");
  }
}
export async function updateSK_API(newData) {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);
  try {
    await fetch(`${BASE_URL}/pegawai/data-diri/${newData?.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });
  } catch (error) {
    console.log("tidak dapat mengedit data diri");
  }
}
export async function createSK_API(newData: CreateSKData) {
  
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);

  try {
    const response = await fetch(`${BASE_URL}/pegawai/data-diri`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("tidak dapat menambahkan data diri:", error);
    throw error;
  }
}
