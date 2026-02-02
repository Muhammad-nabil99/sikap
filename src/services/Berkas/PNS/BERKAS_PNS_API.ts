import { NewUser } from "../../user/userAPI";

export interface InputBerkas {
  id: number;
  pegawais_id: number;
  sk_pns: string;
  sk_cpns: string;
  pegawai: NewUser;
  sk_gaji_berkala: string;
  sk_jabatan: string;
  status: string;
  sk_pangkat_terakhir: string;
  file_sk: string;
}

export interface BERKAS_TYPE {
  data: InputBerkas;
  message: string;
  status: string;
}
export interface DocumentKP {
  id: number;
  sk_pns: string;
  sk_cpns: string;
  sk_gaji_berkala: string;
  sk_jabatan: string;
  sk_pangkat_terakhir: string;
}

export async function GET_BERKAS_KENAIKAN_PANGKAT_PNS_API<BERKAS_TYPE>() {
  const getToken = localStorage.getItem("token");
  if (!getToken) return [];
  const token = JSON.parse(getToken);
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/sk-pns`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );
    if (!response.ok)
      throw new Error("Failed to retrive data kenaikan pangkat");
    const data = await response.json();

    return data || [];
  } catch (error) {
    console.log("tidak dapat mengambil data kenaikan pangkat");
    return [];
  }
}
export async function UPDATE_BERKAS_KENAIKAN_PANGKAT_PNS_API(
  formData: FormData,
) {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);
  try {
    await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/sk-pns/update`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
  } catch (error) {
    console.log("tidak dapat mengedit data kenaikan pangkat");
  }
}
export async function CREATE_BERKAS_KENAIKAN_PANGKAT_PNS_API(
  formData: FormData,
) {
  
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/sk-pns`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData,
      },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create data kenaikan pangkat: ${errorText}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        "Server returned non-JSON response. Check authentication or server status.",
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("tidak dapat menambahkan data kenaikan pangkat");
    throw error;
  }
}
