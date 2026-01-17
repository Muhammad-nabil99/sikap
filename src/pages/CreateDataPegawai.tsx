import SKSkeleton from "@/components/SKSkeleton";
import { Button } from "@/components/ui/button";
import useGetUser from "@/features/user/useGetUser";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { NavLink } from "react-router-dom";

interface ProfileFormData {
  name: string;
  nip: string;
  email: string;
  password: string;
  jenis_kelamin : string;
  agama : string;
  nomor : number;
  alamat : string;
  tanggal_lahir : string;
  tempat_lahir : string;
  unit_kerja : string;
  avatar: string | null;
}

const CreateDataPegawai: React.FC = () => {
  const { user, isLoadingUser } = useGetUser();
  const userData = user?.data;
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    password: "",
    nomor : 82232325321,
    nip : "",
    jenis_kelamin : "",
    agama : "",
    tanggal_lahir : "",tempat_lahir : "",
    unit_kerja : "",
    alamat : "",
    avatar: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
  };


  const userFields = [
      { label: "Nama", value: userData?.nama },
      { label: "NIP", value: userData?.nip },
      { label: "Email", value: userData?.email },
      { label: "Nomor Telepon", value: userData?.nomor },
      { label: "Agama", value: userData?.agama },
      { label: "Jenis Kelamin", value: userData?.jenis_kelamin },
      {
        label: "Tempat, Tanggal Lahir",
        value: `${userData?.tempat_lahir}, ${userData?.tanggal_lahir}`,
      },
      { label: "Alamat", value: userData?.alamat },
      { label: "unit kerja", value: 'kebudayaan' },
    ];

    if (isLoadingUser) return <SKSkeleton />;
  return (
 
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-100">
       <div className="mb-8 border-b pb-4">
         <h1 className="text-2xl font-semibold text-gray-800 capitalize">Ubah data pegawai</h1>
         <p className="capitalize text-gray-500 text-sm mt-1">
           Perbaruhi data pegawai data.
         </p>
       </div>

       <form onSubmit={handleSubmit} className="space-y-6">
         {/* <div className="flex items-center gap-4">
           <div className="relative w-20 h-20">
             <img
              src={preview || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-20 h-20 object-cover rounded-full border border-gray-200 shadow-sm"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-.828.514l-4 1a1 1 0 01-1.265-1.265l1-4a2 2 0 01.514-.828z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="font-medium text-gray-700">Profile Picture</p>
            <p className="text-gray-500 text-sm">
              PNG, JPG maks. 2MB — Tekan ikon untuk mengubah.
            </p>
          </div>
        </div> */}
        {/* nip */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">NIP</label>
          <input
            type="text"
            name="nip"
            placeholder="Masukkan NIP anda"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        
        {/* nama */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nama</label>
          <input
            type="text"
            name="name"
            placeholder="Masukkan nama anda"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        
        {/* email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="contoh@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        {/* nomor */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nomor</label>
          <input
            type="text"
            name="nomor"
            placeholder="082213483333"
            value={formData.nomor}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        {/* jenis kelamin */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Jenis Kelamin</label>
          
          <select name="Jenis Kelamin" id="">
            <option  value="laki_laki">laki-laki</option>
            <option  value="perempuan">Perempuan</option>
          </select>
          
          
        </div>
        {/* agama */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Agama</label>
          
          <select name="Agama" id="">
            <option  value="islam">islam</option>
            <option  value="kristen">kristen</option>
            <option  value="ketolik">ketolik</option>
            <option  value="hindu">hindu</option>
            <option  value="budha">budha</option>
          </select>
        </div>
        {/* alamat */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Alamat</label>
          <input
            type="text"
            name="alamat"
            placeholder="masukkan alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
         {/* tempat lahir */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tempat Lahir</label>
          <input
            type="text"
            name="tempat_lahir"
            placeholder="masukkan tempat lahir"
            value={formData.tempat_lahir}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        
        {/* tanggal lahir */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggal lahir"
            placeholder="masukkan tanggal lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
         {/* unit kerja */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 capitalize">unit kerja</label>
          
          <select name="unit kerja" id="">
            <option  value="bidang_sma">bidang SMA</option>
            <option  value="bidang_smk">bidang SMK</option>
            <option  value="bidang_pklk">bidang PK-LK</option>
            <option  value="bidang_gtk">bidang GTK</option>
            <option  value="bpp">bidang perencanaan dan pengaggaran</option>
            <option  value="bidang_kebudayaan">bidang kebudayaan</option>
                
              </select>
        </div>
        {/* password lama */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password Lama</label>
          <input
            type="password"
            name="password"
            placeholder="masukan password lama"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
          {/* password lama */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password Baru
          </label>
          <input
            type="password"
            name="password"
            placeholder="masukkan password baru"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            Simpan Perubahan
          </button>
        </div>
        
        
      </form>
    </div> 
   
    
  );
};

export default CreateDataPegawai;
