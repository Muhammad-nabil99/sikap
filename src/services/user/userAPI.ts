import { BASE_URL } from "@/utils/config";

export interface UpdateUserPayload {
  nip?: number;
  nama?: string;
  password?: string;
  password_confirmation?: string;
}

export interface Pegawai {
  message: string;
  data: NewUser;
  token: string;
}
export interface NewUser {
  nip: number;
  nama: string;
  password: string;
  email?: string;
  agama?: string;
  jenis_kelamin?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  alamat?: string;
  nomor?: number;
  unit_kerja: string;
  password_confirmation: string;
}
export async function registerUserAPI(newUser: NewUser) {
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newUser),
      },
    );

    const text = await response.text();
    console.log("response", response);

    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      console.error("❌ Backend returned HTML, not JSON:");
      console.error(text.slice(0, 300));
      throw new Error("Server did not return JSON");
    }

    if (!response.ok) {
      throw new Error(data?.message || "Registrasi gagal");
    }

    console.log("data", data);

    localStorage.setItem("token", data?.token);
    return data;
  } catch (error) {
    console.log("tidak dapat melakukan registrasi");
    throw error;
  }
}

export async function loginUserAPI(user: { nip: number; password: string }) {
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      },
    );
    if (!response.ok) throw new Error("Failed to login");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("tidak dapat melakukan login", error.message);
  }
}
export async function getUserAPI(): Promise<Pegawai> {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/pegawai/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    if (!response.ok) throw new Error("Failed to login");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("tidak dapat menemukan user", error);
    throw error;
  }
}

export async function updateUserAPI(newData: UpdateUserPayload) {
  console.log("newData", newData);

  const token = JSON.parse(localStorage.getItem("token") || "null");

  const response = await fetch(
    `https://dashboardsikap.btikpsultra.my.id/api/pegawai/profile`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    },
  );

  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("Server did not return JSON");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Gagal mengedit data diri");
  }

  return data;
}

export async function logoutUserAPI() {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);

  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/logout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    console.log("response", response);

    if (!response.ok) throw new Error("Failed to logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.log("tidak dapat melakukan logout", error);
    throw error;
  }
}
