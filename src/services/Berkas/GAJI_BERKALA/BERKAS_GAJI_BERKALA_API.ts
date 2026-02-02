export interface BerkasKenaikanPangkatGajiBerkala {
  id: number;
  pegawais_id: number;
  sk_gaji_berkala: string;
  created_at: string;
  updated_at: string;
}

export interface BERKAS_GAJI_BERKALA_RESPONSE {
  status: string;
  message: string;
  data: BerkasKenaikanPangkatGajiBerkala[];
}

export async function GET_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    return { status: "error", message: "No token", data: [] };
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/sk-gaji-berkala`,
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
      throw new Error("Failed to retrieve SK Gaji Berkala data");
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error GET SK Gaji Berkala:", error);
    return { status: "error", message: "Failed to fetch", data: [] };
  }
}

export async function CREATE_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API(
  formData: FormData,
) {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    throw new Error("No authentication token found");
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/sk-gaji-berkala`,
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
      throw new Error(`Failed to create SK Gaji Berkala: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ CREATE SK Gaji Berkala Error:", error);
    throw error;
  }
}

export async function UPDATE_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API(
  formData: FormData,
) {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    throw new Error("No authentication token found");
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/sk-gaji-berkala/update`,
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
      throw new Error("Failed to update SK Gaji Berkala");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ UPDATE SK Gaji Berkala Error:", error);
    throw error;
  }
}