import { getUserAPI, Pegawai } from "@/services/user/userAPI";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function useGetUser() {
  const navigate = useNavigate();
  const {
    data: user,
    isPending: isLoadingUser,
    error,
  } = useQuery<Pegawai, Error>({
    queryFn: getUserAPI,
    queryKey: ["user"],
    retry: false,
  });

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  return { user, isLoadingUser };
}

export default useGetUser;
