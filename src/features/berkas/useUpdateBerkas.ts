import { updateBerkas_API } from "@/services/Berkas/berkasAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateBerkas() {
  //    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: onUpdateBerkas, isPending: isUpdatingBerkas } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateBerkas_API(id, formData),
    onSuccess: () => {
      toast.success("Berhasil Edit");
      //  navigate('/berkas')
      queryClient.invalidateQueries({ queryKey: ["berkas"] });
    },
    onError: (error) => {
      toast.error("Gagal Edit");
      console.log(error.message);
    },
  });

  return { onUpdateBerkas, isUpdatingBerkas };
}
export default useUpdateBerkas;
