import { CREATE_BERKAS_KENAIKAN_PANGKAT_CPNS_API } from "@/services/Berkas/CPNS/BERKAS_CPNS_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateBerkasKenaikanPangkatCPNS() {
  const queryClient = useQueryClient();
  
  const {
    mutate: onCreateBerkasKenaikanPangkatCPNS,
    isPending: isCreatingBerkasKenaikanPangkatCPNS,
  } = useMutation({
    mutationFn: CREATE_BERKAS_KENAIKAN_PANGKAT_CPNS_API,
    onSuccess: (data) => {
      toast.success("SK CPNS berhasil diupload");
      
      // Invalidate to refetch data
      queryClient.invalidateQueries({ queryKey: ["berkas-cpns"] });
    },
    onError: (error) => {
      console.error("❌ Upload gagal:", error);
      toast.error("Gagal upload SK CPNS");
    },
  });

  return {
    onCreateBerkasKenaikanPangkatCPNS,
    isCreatingBerkasKenaikanPangkatCPNS,
  };
}

export default useCreateBerkasKenaikanPangkatCPNS;