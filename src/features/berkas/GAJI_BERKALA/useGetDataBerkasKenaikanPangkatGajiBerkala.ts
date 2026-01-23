import { GET_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API } from "@/services/Berkas/GAJI_BERKALA/BERKAS_GAJI_BERKALA_API";
import { GET_BERKAS_KENAIKAN_PANGKAT_JABATAN_API } from "@/services/Berkas/JABATAN/BERKAS_JABATAN_API";
import { useQuery } from "@tanstack/react-query";

function useGetBerkasKenaikanPangkatGajiBerkala() {
  const {
    data: getBerkasKenaikanPangkatGajiBerkala,
    isLoading: isLoadingGetBerkasKenaikanPangkatGajiBerkala,
  } = useQuery({
    queryFn: GET_BERKAS_KENAIKAN_PANGKAT_GAJI_BERKALA_API,
    queryKey: ["gaji-berkala"],
  });
  return {
    getBerkasKenaikanPangkatGajiBerkala,
    isLoadingGetBerkasKenaikanPangkatGajiBerkala,
  };
}
export default useGetBerkasKenaikanPangkatGajiBerkala;
