export interface BerkasKenaikanPangkatJabatan {
  id: number;
  pegawais_id: number;
  sk_jabatan: string;
  created_at: string;
  updated_at: string;
}

export interface BERKAS_JABATAN_RESPONSE {
  status: string;
  message: string;
  data: BerkasKenaikanPangkatJabatan[];
}

export async function GET_BERKAS_KENAIKAN_PANGKAT_JABATAN_API() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    return { status: "error", message: "No token", data: [] };
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-jabatan`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );
    
    if (!response.ok) {
      throw new Error("Failed to retrieve SK Jabatan data");
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error GET SK Jabatan:", error);
    return { status: "error", message: "Failed to fetch", data: [] };
  }
}

export async function CREATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API(
  formData: FormData,
) {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    throw new Error("No authentication token found");
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-jabatan`,
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
      throw new Error(`Failed to create SK Jabatan: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ CREATE SK Jabatan Error:", error);
    throw error;
  }
}

export async function UPDATE_BERKAS_KENAIKAN_PANGKAT_JABATAN_API(
  id: number,
  formData: FormData,
) {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    throw new Error("No authentication token found");
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-jabatan/update`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    
    if (!response.ok) {
      throw new Error("Failed to update SK Jabatan");
    }
    
    const data = await response.json();
    console.log("✅ UPDATE SK Jabatan Response:", data);
    return data;
  } catch (error) {
    console.error("❌ UPDATE SK Jabatan Error:", error);
    throw error;
  }
}