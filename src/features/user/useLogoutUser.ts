import { logoutUserAPI } from "@/services/user/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogoutUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUserAPI,
    onSuccess: () => {
      queryClient.removeQueries();
      
      toast.success("Berhasil Keluar");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error("Gagal Keluar");
      console.log(error.message);
    },
  });

  return { logout, isPending };
}
export default useLogoutUser;
