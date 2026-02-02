import { UPDATE_BERKAS_KENAIKAN_PANGKAT_CPNS_API } from "@/services/Berkas/CPNS/BERKAS_CPNS_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateBerkasKenaikanPangkatCPNS() {
  const queryClient = useQueryClient();

  const {
    mutate: onUpdateBerkasKenaikanPangkatCPNS,
    isPending: isUpdatingBerkasKenaikanPangkatCPNS,
  } = useMutation({
    mutationFn: UPDATE_BERKAS_KENAIKAN_PANGKAT_CPNS_API,
    onSuccess: (data) => {
      console.log("✅ Update berhasil:", data);
      toast.success("SK CPNS berhasil diperbarui");

      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: ["berkas-cpns"] });
    },
    onError: (error) => {
      console.error("❌ Update gagal:", error);
      toast.error("Gagal update SK CPNS");
    },
  });

  return {
    onUpdateBerkasKenaikanPangkatCPNS,
    isUpdatingBerkasKenaikanPangkatCPNS,
  };
}

export default useUpdateBerkasKenaikanPangkatCPNS;
