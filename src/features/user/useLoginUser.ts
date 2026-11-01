import { loginUserAPI } from "@/services/user/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLoginUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: async (user) => {
      if (!user?.token) {
        toast.error("User atau Password anda salah");
        return;
      }
      const { token } = user;

      localStorage.setItem("token", JSON.stringify(token));
      toast.success("Berhasil Login");
      await queryClient.resetQueries({ queryKey: ["user"] });
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error("User atau Password anda salah");
      console.log(error.message);
    },
  });

  return { login, isPending };
}
export default useLoginUser;
