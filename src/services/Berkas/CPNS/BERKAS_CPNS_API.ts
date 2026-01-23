// CPNS stores a SINGLE file, not an array
export interface BerkasKenaikanPangkatCPNS {
  id: number;
  pegawais_id: number;
  sk_cpns: string; // This is the file URL
  created_at: string;
  updated_at: string;
}

export interface BERKAS_CPNS_RESPONSE {
  status: string;
  message: string;
  data: BerkasKenaikanPangkatCPNS; // NOT an array - just a single object!
}

// GET - Returns a SINGLE object, not array
export async function GET_BERKAS_KENAIKAN_PANGKAT_CPNS_API() {
  const getToken = localStorage.getItem("token");
  if (!getToken) return { status: "error", message: "No token", data: null };
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-cpns`,
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
      throw new Error("Failed to retrieve SK CPNS data");
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error GET SK CPNS:", error);
    return { status: "error", message: "Failed to fetch", data: null };
  }
}

// CREATE - Returns the file URL
export async function CREATE_BERKAS_KENAIKAN_PANGKAT_CPNS_API(formData: FormData) {
  const getToken = localStorage.getItem("token");
  if (!getToken) throw new Error("No authentication token found");
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-cpns`,
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
      throw new Error(`Failed to create SK CPNS: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ CREATE SK CPNS Error:", error);
    throw error;
  }
}

// UPDATE
export async function UPDATE_BERKAS_KENAIKAN_PANGKAT_CPNS_API(
  id: number,
  formData: FormData,
) {
  const getToken = localStorage.getItem("token");
  if (!getToken) throw new Error("No authentication token found");
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-cpns/update`,
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
      throw new Error("Failed to update SK CPNS");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ UPDATE SK CPNS Error:", error);
    throw error;
  }
}