import { GET_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API } from "@/services/Berkas/PANGKAT_TERAKHIR/BERKAS_PANGKAT_TERAKHIR_API";
import { useQuery } from "@tanstack/react-query";

function useGetBerkasKenaikanPangkatPangkatTerakhir() {
  const {
    data: getBerkasKenaikanPangkatPangkatTerakhir,
    isLoading: isLoadingGetBerkasKenaikanPangkatPangkatTerakhir,
  } = useQuery({
    queryFn: GET_BERKAS_KENAIKAN_PANGKAT_PANGKAT_TERAKHIR_API,
    queryKey: ["pangkat-terakhir"],
  });
  return {
    getBerkasKenaikanPangkatPangkatTerakhir,
    isLoadingGetBerkasKenaikanPangkatPangkatTerakhir,
  };
}
export default useGetBerkasKenaikanPangkatPangkatTerakhir;
