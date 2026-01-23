import { updateSK_API } from "@/services/SK/SK_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useUpdateSK() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: onUpdateSK, isPending: isUpdatingSK } = useMutation({
    mutationFn: updateSK_API,
    onSuccess: () => {
      toast.success("Berhasil Edit");
      navigate("/sk");
      queryClient.invalidateQueries({ queryKey: ["sk"] });
    },
    onError: (error) => {
      toast.error("Gagal Edit");
      console.log(error.message);
    },
  });
  return { onUpdateSK, isUpdatingSK };
}
export default useUpdateSK;
