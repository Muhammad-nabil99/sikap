// Interface for individual record
export interface BerkasKenaikanPangkatPangkatTerakhir {
  id: number;
  pegawais_id: number;
  sk_pangkat_terakhir: string; // File URL
  created_at: string;
  updated_at: string;
}

// Response structure - Returns ARRAY
export interface BERKAS_PANGKAT_TERAKHIR_RESPONSE {
  status: string;
  message: string;
  data: BerkasKenaikanPangkatPangkatTerakhir[]; // Array of records
}

// GET - Returns array of all records
export async function GET_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API() {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    return { status: "error", message: "No token", data: [] };
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-pangkat-terakhir`,
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
      throw new Error("Failed to retrieve SK Pangkat Terakhir data");
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error GET SK Pangkat Terakhir:", error);
    return { status: "error", message: "Failed to fetch", data: [] };
  }
}

// CREATE - Add new record
export async function CREATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API(
  formData: FormData,
) {
  const getToken = localStorage.getItem("token");
  if (!getToken) {
    throw new Error("No authentication token found");
  }
  
  const token = JSON.parse(getToken);
  
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-pangkat-terakhir`,
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
      throw new Error(`Failed to create SK Pangkat Terakhir: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ CREATE SK Pangkat Terakhir Error:", error);
    throw error;
  }
}

// UPDATE - Update specific record by ID
export async function UPDATE_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API(
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
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/kenaikan-pangkat/sk-pangkat-terakhir/update`,
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
      throw new Error("Failed to update SK Pangkat Terakhir");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ UPDATE SK Pangkat Terakhir Error:", error);
    throw error;
  }
}