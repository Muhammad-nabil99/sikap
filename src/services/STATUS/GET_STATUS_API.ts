export async function GET_STATUS_BERKAS_API() {
  const getToken = localStorage.getItem("token");
  const token = JSON.parse(getToken);
  try {
    const response = await fetch(
      `https://dashboardsikap.btikpsultra.my.id/api/berkas/status`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    // ✅ Handle 404 - first time user: form is CLOSED
    if (response.status === 404) {
      return { data: { status: 0 } };
    }

    if (!response.ok) throw new Error("Failed to login");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("tidak dapat menemukan user", error);
    // ✅ Return default when error occurs
    return { data: { status: 0 } };
  }
}
