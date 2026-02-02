import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  User,
  Upload,
  UserCircle,
  History,
  X,
  ChevronDown,
  HandCoins,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import favicon from "@/assets/favicon.ico";
import useGetUser from "@/features/user/useGetUser";
import { shortenName } from "@/utils/helper";
import useGetSK from "@/features/SK/useGetSK";
import GetAllBerkas from "@/features/berkas/GET_ALL_BERKAS/GetAllBerkas";

export const Sidebar = () => {
  const documentConfigs = GetAllBerkas();
  const isAllUploaded = !documentConfigs?.every(
    (item) => item?.getData?.data,
  );

  const { SK, isLoadingSK } = useGetSK();
  const { user } = useGetUser();
  const location = useLocation();
  const { setOpenMobile, isMobile, open } = useSidebar();

  // Logical state for dropdowns
  const [openBerkas, setOpenBerkas] = useState(
    location.pathname.startsWith("/berkas"),
  );
  const [openArsip, setOpenArsip] = useState(
    location.pathname.startsWith("/arsip"),
  );

  // Validation Logic data pegawai
  const REQUIRED_FIELDS_DATA_PEGAWAI = [
    "nama",
    "nip",
    "email",
    "agama",
    "jenis_kelamin",
    "alamat",
    "tempat_lahir",
    "tanggal_lahir",
    "nomor",
  ];
  const hasEmptyUserData = REQUIRED_FIELDS_DATA_PEGAWAI.some(
    (key) => !user?.data?.[key]?.toString().trim(),
  );
  // Validation Logic sk
  const REQUIRED_FIELDS_SK = [
    "tanggal_sk",
    "nomor_sk",
    "tmt_golongan",
    "nomor_pertek_bkn",
    "tanggal_pertek_bkn",
    "masa_gk_bulanan",
    "masa_gk_tahunan",
    "golongan_ruang",
    "jenis_kp",
    "pangkat",
    "gaji_pokok",
    "kgb_terakhir",
  ];
  const hasEmptySK =
    !SK ||
    REQUIRED_FIELDS_SK?.some((key) => !SK?.data?.[0]?.[key]?.toString().trim());

  const menuItems = [
    { id: "dash", link: "/dashboard", icon: Home, label: "Dashboard" },
    {
      id: "data",
      link: "/data-pegawai",
      icon: UserCircle,
      label: "Data Pegawai",
      alert: hasEmptyUserData,
    },
    {
      id: "sk",
      link: "/sk",
      icon: User,
      label: "Surat Keputusan (SK)",
      alert: hasEmptySK,
    },
    {
      id: "upload_berkas",
      link: "/unggah-berkas",
      icon: Upload,
      label: "Unggah Berkas",
      alert: hasEmptySK,
    },
    {
      id: "berkas",
      link: "/berkas",
      icon: FileText,
      label: "Manajemen Berkas",
      setIsOpenMenuList: setOpenBerkas,
      isMenuOpen: openBerkas,
      hasUploadFile: isAllUploaded,
      children: [
        {
          id: "pensiun",
          link: "/berkas/pensiun",
          icon: HandCoins,
          label: "Pensiun",
        },
        {
          id: "berkala",
          link: "/berkas/berkala",
          icon: TrendingUp,
          label: "Gaji Berkala",
        },
        {
          id: "pangkat",
          link: "/berkas/kenaikan-pangkat",
          icon: ArrowUpRight,
          label: "Kenaikan Pangkat",
        },
      ],
    },
    {
      id: "arsip",
      link: "/arsip",
      icon: History,
      label: "Arsip",
      setIsOpenMenuList: setOpenArsip,
      isMenuOpen: openArsip,
      children: [
        {
          id: "pensiun",
          link: "/arsip/pensiun",
          icon: HandCoins,
          label: "Pensiun",
        },
        {
          id: "berkala",
          link: "/arsip/berkala",
          icon: TrendingUp,
          label: "Gaji Berkala",
        },
        {
          id: "pangkat",
          link: "/arsip/kenaikan-pangkat",
          icon: ArrowUpRight,
          label: "Kenaikan Pangkat",
        },
      ],
    },
  ];

  const handleLinkClick = () => isMobile && setOpenMobile(false);

  if (!user?.data || isLoadingSK) return null;

  return (
    <SidebarUI className="border-r border-slate-100 bg-white">
      {/* 1. Header: Branding */}
      <SidebarHeader className="p-6">
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-3"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 overflow-hidden shrink-0">
              <img src={favicon} alt="logo" className="w-6 h-6" />
            </div>
            <div
              className={cn(
                "transition-opacity duration-300",
                !open && "opacity-0 invisible",
              )}
            >
              <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none">
                SIKAP
              </h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                pegawai Portal
              </span>
            </div>
          </Link>
          {isMobile && (
            <button onClick={() => setOpenMobile(false)}>
              <X className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>
      </SidebarHeader>

      {/* 2. Content: Navigation */}
      <SidebarContent className="px-4">
        <SidebarMenu className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.link ||
              (item.children && location.pathname.startsWith(item.link));
            const hasChildren = item.children?.length > 0;
            if (item?.hasUploadFile) return;
            return (
              <SidebarMenuItem key={item.id} className="list-none">
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => item?.setIsOpenMenuList(!item?.isMenuOpen)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-500 hover:bg-slate-50",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5",
                          isActive
                            ? "text-blue-600"
                            : "group-hover:text-slate-700",
                        )}
                      />
                      <span className="flex-1 text-left text-sm font-semibold tracking-tight">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          item?.isMenuOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {/* Collapsible Children */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        item?.isMenuOpen ? "max-h-40 mt-1" : "max-h-0",
                      )}
                    >
                      <div className="ml-9 space-y-1 border-l-2 border-slate-100 pl-4">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.id}
                            to={child.link}
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center gap-3 py-2 text-sm transition-colors",
                                isActive
                                  ? "text-blue-600 font-bold"
                                  : "text-slate-500 hover:text-slate-800",
                              )
                            }
                          >
                            <span>{child.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.link}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden",
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                          : "text-slate-500 hover:bg-blue-50 hover:text-blue-600",
                      )
                    }
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-semibold tracking-tight truncate">
                      {item.label}
                    </span>
                    {item.alert && (
                      <span className="absolute right-3 w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-400/20 animate-pulse" />
                    )}
                  </NavLink>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* 3. Footer: User Profile Card */}
      <SidebarFooter className="p-4 bg-slate-50/50 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2">
          <div className="uppercase w-9 h-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600 text-xs">
            {shortenName(user.data.nama) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="capitalize text-xs font-bold text-slate-800 truncate">
              {user.data.nama}
            </p>
            <p className="text-[10px] text-slate-500 font-medium truncate">
              NIP. {user.data.nip}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </SidebarUI>
  );
};
