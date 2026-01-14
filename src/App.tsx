import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/DashboardLayout";
import Riwayat from "./pages/Riwayat";
import CekStatus from "./pages/CekStatus";
import ProgressDocument from "./pages/ProgressDocument";
import SK from "./pages/SK";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn";
import Berkas from "./pages/Berkas";
import BerkasDetail from "./pages/BerkasDetail";
import CreateBerkas from "./pages/CreateBerkas";
import CreateSK from "./pages/CreateSK";

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "",
            color: "#000000",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "#34d399",
              color: "black",
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: "#b91c1c",
              color: "black",
            },
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={true} />
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <DashboardLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Index />} />
              <Route path="berkas" element={<Berkas />} />
              <Route path="berkas/:id" element={<BerkasDetail />} />
              <Route
                path="berkas/tambah"
                element={
                  <CreateBerkas isOpen={null} berkas={null} setOpen={null} />
                }
              />
              <Route path="sk" element={<SK />} />
              <Route path="sk/tambah" element={<CreateSK />} />
              <Route path="progress" element={<ProgressDocument />} />
              <Route path="status" element={<CekStatus />} />
              {/* <Route path="profile" element={<ProfileForm />} /> */}
              <Route path="riwayat" element={<Riwayat />} />
            </Route>
            <Route path="/login" element={<SignIn />} />
            {/* <Route path="/register" element={<SignUp />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  );
};

export default App;
