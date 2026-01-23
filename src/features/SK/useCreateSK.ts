import { createSK_API } from "@/services/SK/SK_API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateSK() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: onCreateSK, isPending: isCreatingSK } = useMutation({
    mutationFn: createSK_API,
    onSuccess: () => {
      toast.success("Berhasil menambahkan");
      navigate("/sk");
      console.log('testing');
      
      queryClient.invalidateQueries({ queryKey: ["sk"] });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan");
      console.log(error.message);
    },
  });

  return { onCreateSK, isCreatingSK };
}
export default useCreateSK;
