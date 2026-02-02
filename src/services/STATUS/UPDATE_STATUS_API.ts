type StatusPayload = {
  status: 0 | 1;
};

export async function UPDATE_STATUS_API(payload: StatusPayload) {

  const token = JSON.parse(localStorage.getItem("token") || "");
  const res = await fetch(
    "https://dashboardsikap.btikpsultra.my.id/api/berkas/status",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: payload.status,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
}
