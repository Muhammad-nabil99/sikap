import { getUserAPI, Pegawai } from "@/services/user/userAPI";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function useGetUser() {
  const navigate = useNavigate();
  const {
    data: user,
    isPending,
    isFetching,
    error,
  } = useQuery<Pegawai, Error>({
    queryFn: getUserAPI,
    queryKey: ["user"],
    retry: false,
  });

  const isLoadingUser = isPending || (isFetching && !user?.data);

  useEffect(() => {
    if (error && !isFetching) {
      navigate("/login", { replace: true });
    }
  }, [error, isFetching, navigate]);

  return { user, isLoadingUser };
}

export default useGetUser;
