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
 
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
  <div className="mb-8 border-b pb-6">
    <h1 className="text-3xl font-bold text-gray-800">Ubah Data Pegawai</h1>
    <p className="text-gray-600 text-sm mt-2">
      Perbarui informasi data pegawai dengan lengkap dan akurat.
    </p>
  </div>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* NIP */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        NIP <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="nip"
        placeholder="Masukkan NIP"
        value={formData.nip}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
        required
      />
    </div>
    
    {/* Nama */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Nama Lengkap <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="name"
        placeholder="Masukkan nama lengkap"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
        required
      />
    </div>
    
    {/* Email */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        placeholder="contoh@email.com"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
        required
      />
    </div>
    
    {/* Nomor Telepon */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Nomor Telepon <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        name="nomor"
        placeholder="082213483333"
        value={formData.nomor}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
        required
      />
    </div>
    
    {/* Jenis Kelamin */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Jenis Kelamin <span className="text-red-500">*</span>
      </label>
      <select 
        name="jenis_kelamin" 
        value={formData.jenis_kelamin}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   bg-white cursor-pointer appearance-none 
                   bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236b7280%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] 
                   bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
        required
      >
        <option value="">Pilih jenis kelamin</option>
        <option value="laki_laki">Laki-laki</option>
        <option value="perempuan">Perempuan</option>
      </select>
    </div>
    
    {/* Agama */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Agama <span className="text-red-500">*</span>
      </label>
      <select 
        name="agama"
        value={formData.agama}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   bg-white cursor-pointer appearance-none 
                   bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236b7280%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] 
                   bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
        required
      >
        <option value="">Pilih agama</option>
        <option value="islam">Islam</option>
        <option value="kristen">Kristen</option>
        <option value="katolik">Katolik</option>
        <option value="hindu">Hindu</option>
        <option value="budha">Budha</option>
        <option value="konghucu">Konghucu</option>
      </select>
    </div>
    
    {/* Alamat */}
    <div className="group lg:col-span-3">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Alamat Lengkap <span className="text-red-500">*</span>
      </label>
      <textarea
        name="alamat"
        placeholder="Masukkan alamat lengkap"
        value={formData.alamat}
        onChange={handleChange}
        rows="3"
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400 resize-none"
        required
      />
    </div>
    
    {/* Tempat Lahir */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Tempat Lahir <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="tempat_lahir"
        placeholder="Masukkan tempat lahir"
        value={formData.tempat_lahir}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
        required
      />
    </div>
    
    {/* Tanggal Lahir */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Tanggal Lahir <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        name="tanggal_lahir"
        value={formData.tanggal_lahir}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   cursor-pointer"
        required
      />
    </div>
    
    {/* Unit Kerja */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Unit Kerja <span className="text-red-500">*</span>
      </label>
      <select 
        name="unit_kerja"
        value={formData.unit_kerja}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   bg-white cursor-pointer appearance-none 
                   bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236b7280%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] 
                   bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
        required
      >
        <option value="">Pilih unit kerja</option>
        <option value="bidang_sma">Bidang SMA</option>
        <option value="bidang_smk">Bidang SMK</option>
        <option value="bidang_pklk">Bidang PK-LK</option>
        <option value="bidang_gtk">Bidang GTK</option>
        <option value="bpp">Bidang Perencanaan dan Penganggaran</option>
        <option value="bidang_kebudayaan">Bidang Kebudayaan</option>
      </select>
    </div>

    {/* Divider */}
    <div className="lg:col-span-3 border-t border-gray-200 my-4"></div>

    {/* Password Section Header */}
    <div className="lg:col-span-3 mb-2">
      <h2 className="text-xl font-semibold text-gray-800">Ubah Password</h2>
      <p className="text-gray-500 text-sm mt-1">Kosongkan jika tidak ingin mengubah password</p>
    </div>
    
    {/* Password Lama */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Password Lama
      </label>
      <input
        type="password"
        name="password_lama"
        placeholder="Masukkan password lama"
        value={formData.password_lama}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
      />
    </div>
    
    {/* Password Baru */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Password Baru
      </label>
      <input
        type="password"
        name="password_baru"
        placeholder="Masukkan password baru"
        value={formData.password_baru}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
      />
    </div>

    {/* Konfirmasi Password Baru */}
    <div className="group">
      <label className="block text-gray-700 font-semibold mb-2 text-sm">
        Konfirmasi Password Baru
      </label>
      <input
        type="password"
        name="password_konfirmasi"
        placeholder="Ulangi password baru"
        value={formData.password_konfirmasi}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-gray-400 focus:outline-none transition-all
                   placeholder:text-gray-400"
      />
    </div>
    
    {/* Submit Button */}
    <div className="lg:col-span-3 flex justify-end gap-4 mt-6">
      <button
        type="button"
        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold 
                   hover:bg-gray-50 transition-all shadow-sm"
      >
        Batal
      </button>
      <button
        type="submit"
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                   hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg 
                   hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Simpan Perubahan
      </button>
    </div>
    
  </form>
</div>
   
    
  );
};

export default CreateDataPegawai;
