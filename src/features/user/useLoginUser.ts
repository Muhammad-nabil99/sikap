import { loginUserAPI } from "@/services/user/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLoginUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: (user) => {
      const { token } = user;
      localStorage.setItem("token", JSON.stringify(token));
      toast.success("Berhasil Login");
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Gagal Login");
      console.log(error.message);
    },
  });

  return { login, isPending };
}
export default useLoginUser;
