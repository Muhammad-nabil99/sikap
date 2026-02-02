import { DocumentConfig } from "@/pages/KenaikanPangkat";
import useUpdateBerkasKenaikanPangkatGajiBerkala from "../GAJI_BERKALA/useUpdateBerkasKenaikanPangkatGajiBerkala";
import useCreateBerkasKenaikanPangkatGajiBerkala from "../GAJI_BERKALA/useCreateBerkasKenaikanPangkatGajiBerkala";
import useGetBerkasKenaikanPangkatGajiBerkala from "../GAJI_BERKALA/useGetDataBerkasKenaikanPangkatGajiBerkala";
import useUpdateBerkasKenaikanPangkatJabatan from "../JABATAN/useUpdateBerkasKenaikanPangkatJabatan";
import useCreateBerkasKenaikanPangkatJabatan from "../JABATAN/useCreateBerkasKenaikanPangkatJabatan";
import useGetBerkasKenaikanPangkatJabatan from "../JABATAN/useGetDataBerkasKenaikanPangkatJabatan";
import useUpdateBerkasKenaikanPangkatPangkatTerakhir from "../PANGKAT_TERAKHIR/useUpdateBerkasKenaikanPangkatPangkatTerakhir";
import useCreateBerkasKenaikanPangkatPangkatTerakhir from "../PANGKAT_TERAKHIR/useCreateBerkasKenaikanPangkatPangkatTerakhir";
import useGetBerkasKenaikanPangkatPangkatTerakhir from "../PANGKAT_TERAKHIR/useGetDataBerkasKenaikanPangkatPengkatTerakhir";
import useGetBerkasKenaikanPangkatPNS from "../PNS/useGetDataBerkasKenaikanPangkatPNS";
import useUpdateBerkasKenaikanPangkatPNS from "../PNS/useUpdateBerkasKenaikanPangkatPNS";
import useCreateBerkasKenaikanPangkatPNS from "../PNS/useCreateBerkasKenaikanPangkatPNS";
import useGetBerkasKenaikanPangkatCPNS from "../CPNS/useGetDataBerkasKenaikanPangkatCPNS";
import useUpdateBerkasKenaikanPangkatCPNS from "../CPNS/useUpdateBerkasKenaikanPangkatCPNS";
import useCreateBerkasKenaikanPangkatCPNS from "../CPNS/useCreateBerkasKenaikanPangkatCPNS";

function GetAllBerkas() {
  // CPNS Hooks
  const {
    onCreateBerkasKenaikanPangkatCPNS,
    isCreatingBerkasKenaikanPangkatCPNS,
  } = useCreateBerkasKenaikanPangkatCPNS();

  const {
    onUpdateBerkasKenaikanPangkatCPNS,
    isUpdatingBerkasKenaikanPangkatCPNS,
  } = useUpdateBerkasKenaikanPangkatCPNS();
  const {
    getBerkasKenaikanPangkatCPNS,
    isLoadingGetBerkasKenaikanPangkatCPNS,
  } = useGetBerkasKenaikanPangkatCPNS();
  
  // PNS Hooks
  const {
    onCreateBerkasKenaikanPangkatPNS,
    isCreatingBerkasKenaikanPangkatPNS,
  } = useCreateBerkasKenaikanPangkatPNS();
  const {
    onUpdateBerkasKenaikanPangkatPNS,
    isUpdatingBerkasKenaikanPangkatPNS,
  } = useUpdateBerkasKenaikanPangkatPNS();
  const { getBerkasKenaikanPangkatPNS, isLoadingGetBerkasKenaikanPangkatPNS } =
    useGetBerkasKenaikanPangkatPNS();

  // PANGKAT TERAKHIR Hooks
  const {
    getBerkasKenaikanPangkatPangkatTerakhir,
    isLoadingGetBerkasKenaikanPangkatPangkatTerakhir,
  } = useGetBerkasKenaikanPangkatPangkatTerakhir();
  const {
    onCreateBerkasKenaikanPangkatPangkatTerakhir,
    isCreatingBerkasKenaikanPangkatPangkatTerakhir,
  } = useCreateBerkasKenaikanPangkatPangkatTerakhir();
  const {
    onUpdateBerkasKenaikanPangkatPangkatTerakhir,
    isUpdatingBerkasKenaikanPangkatPangkatTerakhir,
  } = useUpdateBerkasKenaikanPangkatPangkatTerakhir();

  // JABATAN Hooks
  const {
    getBerkasKenaikanPangkatJabatan,
    isLoadingGetBerkasKenaikanPangkatJabatan,
  } = useGetBerkasKenaikanPangkatJabatan();
  const {
    onCreateBerkasKenaikanPangkatJabatan,
    isCreatingBerkasKenaikanPangkatJabatan,
  } = useCreateBerkasKenaikanPangkatJabatan();
  const {
    onUpdateBerkasKenaikanPangkatJabatan,
    isUpdatingBerkasKenaikanPangkatJabatan,
  } = useUpdateBerkasKenaikanPangkatJabatan();

  // GAJI BERKALA Hooks
  const {
    getBerkasKenaikanPangkatGajiBerkala,
    isLoadingGetBerkasKenaikanPangkatGajiBerkala,
  } = useGetBerkasKenaikanPangkatGajiBerkala();
  const {
    onCreateBerkasKenaikanPangkatGajiBerkala,
    isCreatingBerkasKenaikanPangkatGajiBerkala,
  } = useCreateBerkasKenaikanPangkatGajiBerkala();
  const {
    onUpdateBerkasKenaikanPangkatGajiBerkala,
    isUpdatingBerkasKenaikanPangkatGajiBerkala,
  } = useUpdateBerkasKenaikanPangkatGajiBerkala();

  // Check if any data is still loading
  const isAnyLoading =
    isLoadingGetBerkasKenaikanPangkatCPNS ||
    isLoadingGetBerkasKenaikanPangkatPNS ||
    isLoadingGetBerkasKenaikanPangkatPangkatTerakhir ||
    isLoadingGetBerkasKenaikanPangkatJabatan ||
    isLoadingGetBerkasKenaikanPangkatGajiBerkala;

  const documentConfigs: DocumentConfig[] = [
    {
      key: "sk_cpns",
      label: "SK CPNS",
      fieldName: "sk_cpns",
      getData: getBerkasKenaikanPangkatCPNS,
      onCreate: onCreateBerkasKenaikanPangkatCPNS,
      onUpdate: onUpdateBerkasKenaikanPangkatCPNS,
      isCreating: isCreatingBerkasKenaikanPangkatCPNS,
      isUpdating: isUpdatingBerkasKenaikanPangkatCPNS,
      isLoading: isLoadingGetBerkasKenaikanPangkatCPNS,
    },
    {
      key: "sk_pns",
      label: "SK PNS",
      fieldName: "sk_pns",
      getData: getBerkasKenaikanPangkatPNS,
      onCreate: onCreateBerkasKenaikanPangkatPNS,
      onUpdate: onUpdateBerkasKenaikanPangkatPNS,
      isCreating: isCreatingBerkasKenaikanPangkatPNS,
      isUpdating: isUpdatingBerkasKenaikanPangkatPNS,
      isLoading: isLoadingGetBerkasKenaikanPangkatPNS,
    },
    {
      key: "sk_pangkat_terakhir",
      label: "SK Pangkat Terakhir",
      fieldName: "sk_pangkat_terakhir",
      getData: getBerkasKenaikanPangkatPangkatTerakhir,
      onCreate: onCreateBerkasKenaikanPangkatPangkatTerakhir,
      onUpdate: onUpdateBerkasKenaikanPangkatPangkatTerakhir,
      isCreating: isCreatingBerkasKenaikanPangkatPangkatTerakhir,
      isUpdating: isUpdatingBerkasKenaikanPangkatPangkatTerakhir,
      isLoading: isLoadingGetBerkasKenaikanPangkatPangkatTerakhir,
    },
    {
      key: "sk_jabatan",
      label: "SK Jabatan",
      fieldName: "sk_jabatan",
      getData: getBerkasKenaikanPangkatJabatan,
      onCreate: onCreateBerkasKenaikanPangkatJabatan,
      onUpdate: onUpdateBerkasKenaikanPangkatJabatan,
      isCreating: isCreatingBerkasKenaikanPangkatJabatan,
      isUpdating: isUpdatingBerkasKenaikanPangkatJabatan,
      isLoading: isLoadingGetBerkasKenaikanPangkatJabatan,
    },
    {
      key: "sk_gaji_berkala",
      label: "SK Gaji Berkala",
      fieldName: "sk_gaji_berkala",
      getData: getBerkasKenaikanPangkatGajiBerkala,
      onCreate: onCreateBerkasKenaikanPangkatGajiBerkala,
      onUpdate: onUpdateBerkasKenaikanPangkatGajiBerkala,
      isCreating: isCreatingBerkasKenaikanPangkatGajiBerkala,
      isUpdating: isUpdatingBerkasKenaikanPangkatGajiBerkala,
      isLoading: isLoadingGetBerkasKenaikanPangkatGajiBerkala,
    },
  ];

  // Return object with both data and loading state
  if (isAnyLoading) return;
  return documentConfigs;
}

export default GetAllBerkas;
