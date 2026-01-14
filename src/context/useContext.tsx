import useGetBerkas from "@/features/berkas/useGetDataBerkas";
import useGetSK from "@/features/SK/useGetSK";

import { createContext } from "react";

interface DataContextType {
  infoSubmission: () => boolean;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }) => {
  const { SK, isLoadingSK } = useGetSK();
  const { berkas, isLoadingBerkas } = useGetBerkas();
  function infoSubmission() {
    if (!SK) return false;

    return (
      isLoadingSK ||
      new Date().getTime() < new Date(SK?.data?.[0]?.tmt_golongan)?.getTime()
    );
  }
  const getNewsBerkas =
    isLoadingBerkas ||
    berkas?.data?.filter(
      (item) =>
        new Date(item.created_at).getFullYear() == new Date().getFullYear()
    );

  return (
    <DataContext.Provider value={{ infoSubmission, getNewsBerkas }}>
      {children}
    </DataContext.Provider>
  );
};
