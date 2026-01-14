import { BASE_URL } from "@/utils/config";

export interface Pegawai {
  message: string;
  data: NewUser;
  token: string;
}
export interface NewUser {
  nama: string;
  email: string;
  password: string;
  password_confirmation: string;
  nip: number;
  nomor: number;
  jenis_kelamin: "laki-laki" | "perempuan" | string;
  agama: string;
  alamat: string;
  tempat_lahir: string;
  tanggal_lahir: string;
}
export async function registerUserAPI(newUser: NewUser) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      // Try to get error message from response if it's JSON, else use status text
      let errorMessage = `Failed to register user: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorMessage;
      } catch {
        // If response is not JSON (e.g., HTML error page), use the status
        const text = await response.text();
        console.error(
          "Server returned non-JSON response:",
          text.substring(0, 200)
        );
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    localStorage.setItem("token", data?.token);
    return data;
  } catch (error) {
    console.log("tidak dapat melakukan registrasi");
    throw error;
  }
}

export async function loginUserAPI(user: { email: string; password: string }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Failed to login");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("tidak dapat melakukan login", error.message);
    throw error;
  }
}
export async function getUserAPI(): Promise<Pegawai> {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);
  try {
    const response = await fetch(`${BASE_URL}/pegawai`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials : "include"
    });
    if (!response.ok) throw new Error("Failed to login");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("tidak dapat menemukan user", error);
    throw error;
  }
}
export async function logoutUserAPI() {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);

  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.log("tidak dapat melakukan logout", error);
    throw error;
  }
}
