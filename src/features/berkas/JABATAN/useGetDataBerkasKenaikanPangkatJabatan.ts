import { GET_BERKAS_KENAIKAN_PANGKAT_JABATAN_API } from "@/services/Berkas/JABATAN/BERKAS_JABATAN_API";
import { useQuery } from "@tanstack/react-query";

function useGetBerkasKenaikanPangkatJabatan() {
  const {
    data: getBerkasKenaikanPangkatJabatan,
    isLoading: isLoadingGetBerkasKenaikanPangkatJabatan,
  } = useQuery({
    queryFn: GET_BERKAS_KENAIKAN_PANGKAT_JABATAN_API,
    queryKey: ["jabatan"],
  });
  return {
    getBerkasKenaikanPangkatJabatan,
    isLoadingGetBerkasKenaikanPangkatJabatan,
  };
}
export default useGetBerkasKenaikanPangkatJabatan;
