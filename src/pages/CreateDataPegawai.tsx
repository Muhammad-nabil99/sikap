import SKSkeleton from "@/components/SKSkeleton";
import { Button } from "@/components/ui/button";
import useUpdateUser from "@/features/user/useCreateUser";
import useGetUser from "@/features/user/useGetUser";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Save,
  X as XIcon,
  ArrowLeft,
} from "lucide-react";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface ProfileFormData {
  nip: string;
  nama: string;
  email: string;
  nomor: string;
  jenis_kelamin: string;
  agama: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  unit_kerja: string;
  alamat: string;
  password_lama?: string;
  password_baru?: string;
  password_konfirmasi?: string;
}

const GENDER_OPTIONS = [
  { value: "laki-laki", label: "Laki-laki" },
  { value: "perempuan", label: "Perempuan" },
];

const RELIGION_OPTIONS = [
  { value: "islam", label: "Islam" },
  { value: "kristen", label: "Kristen" },
  { value: "katolik", label: "Katolik" },
  { value: "hindu", label: "Hindu" },
  { value: "budha", label: "Budha" },
  { value: "konghucu", label: "Konghucu" },
];

const WORK_UNIT_OPTIONS = [
  { value: "bidang_perencanaan", label: "Bidang Perencanaan" },
  { value: "bidang_gtk", label: "Bidang GTK" },
  { value: "bidang_sma", label: "Bidang SMA" },
  { value: "bidang_smk_pklk", label: "Bidang SMK - PKLK" },
  { value: "bidang_kebudayaan", label: "Bidang Kebudayaan" },
  { value: "humas", label: "Humas" },
  { value: "kepegawaian_keuangan", label: "Kepegawaian dan Keuangan" },
  { value: "uptd_btikp", label: "UPTD BTIKP" },
  { value: "uptd_museum_taman_budaya", label: "UPTD Museum dan Taman Budaya" },
  {
    value: "uptd_penanganan_siswa_berkebutuhan_khusus",
    label: "UPTD Penanganan Siswa Berkebutuhan Khusus",
  },
  { value: "kcd_konawe_konut", label: "KCD Konawe - Konut" },
  { value: "kcd_kolaka_koltim", label: "KCD Kolaka - Koltim" },
  { value: "kcd_kolaka_utara", label: "KCD Kolaka Utara" },
  { value: "kcd_bombana", label: "KCD Bombana" },
  { value: "kcd_konkep", label: "KCD Konkep" },
  { value: "kcd_muna", label: "KCD Muna" },
  { value: "kcd_mubar_buteng", label: "KCD Mubar - Buteng" },
  { value: "kcd_baubau_buton_selatan", label: "KCD Baubau - Buton Selatan" },
  { value: "kcd_buton", label: "KCD Buton" },
  { value: "kcd_wakatobi", label: "KCD Wakatobi" },
  { value: "kcd_butur", label: "KCD Butur" },
  { value: "kcd_konsel", label: "KCD Konsel" },
];

const INITIAL_FORM_STATE: ProfileFormData = {
  nip: "",
  nama: "",
  email: "",
  nomor: "",
  jenis_kelamin: "",
  agama: "",
  tanggal_lahir: "",
  tempat_lahir: "",
  unit_kerja: "",
  alamat: "",
  password_lama: "",
  password_baru: "",
  password_konfirmasi: "",
};

const inputClasses = cn(
  "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700",
  "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  "hover:border-gray-400 focus:outline-none transition-all",
  "placeholder:text-gray-400",
);

const selectClasses = cn(
  inputClasses,
  "bg-white cursor-pointer appearance-none",
  "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236b7280%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')]",
  "bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
);

const PageHeader = () => (
  <div className="mb-8 border-b pb-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-blue-100 rounded-lg">
        <User className="w-6 h-6 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Ubah Data Pegawai</h1>
    </div>
    <p className="text-gray-600 text-sm ml-14">
      Perbarui informasi data pegawai dengan lengkap dan akurat.
    </p>
  </div>
);

const SectionHeader: React.FC<{
  icon: React.ElementType;
  title: string;
  description?: string;
}> = ({ icon: Icon, title, description }) => (
  <div className="lg:col-span-3 mb-2">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-5 h-5 text-gray-600" />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    {description && <p className="text-gray-500 text-sm ml-7">{description}</p>}
  </div>
);

const FormField: React.FC<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ label, required = false, children, className }) => (
  <div className={cn("group", className)}>
    <label className="block text-gray-700 font-semibold mb-2 text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const TextInput: React.FC<{
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ElementType;
}> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  icon: Icon,
}) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    )}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className={cn(inputClasses, Icon && "pl-10")}
      required={required}
    />
  </div>
);

const SelectInput: React.FC<{
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  required?: boolean;
}> = ({ name, value, onChange, options, placeholder, required }) => (
  <select
    name={name}
    value={value || ""}
    onChange={onChange}
    className={selectClasses}
    required={required}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const TextareaInput: React.FC<{
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}> = ({ name, placeholder, value, onChange, rows = 3, required }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value || ""}
    onChange={onChange}
    rows={rows}
    className={cn(inputClasses, "resize-none")}
    required={required}
  />
);

const FormActions: React.FC<{
  onCancel?: () => void;
  isSubmitting?: boolean;
}> = ({ onCancel, isSubmitting = false }) => (
  <div
    className="
      lg:col-span-3 
      flex flex-col-reverse sm:flex-row 
      sm:justify-end 
      gap-3 sm:gap-4 
      mt-6 pt-6 
      border-t border-gray-200
    "
  >
    <Button
      type="button"
      variant="outline"
      onClick={onCancel}
      className="
        w-full sm:w-auto
        px-8 py-3 
        border-gray-300 text-gray-700 
        hover:bg-gray-50 
        font-semibold
      "
    >
      <XIcon className="w-4 h-4 mr-2" />
      Batal
    </Button>

    <Button
      type="submit"
      disabled={isSubmitting}
      className="
        w-full sm:w-auto
        px-8 py-3 
        bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
        text-white font-semibold 
        shadow-lg hover:shadow-xl 
        transform hover:-translate-y-0.5 transition-all
      "
    >
      <Save className="w-4 h-4 mr-2" />
      {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
    </Button>
  </div>
);

const CreateDataPegawai: React.FC = () => {
  const { user, isLoadingUser } = useGetUser();
  const { updateUser, isPending } = useUpdateUser();
  const [formData, setFormData] = useState<ProfileFormData>(INITIAL_FORM_STATE);

  // Populate form when user data is loaded
  useEffect(() => {
    if (user?.data) {
      setFormData({
        nip: user.data.nip?.toString() || "",
        nama: user.data.nama || "",
        email: user.data.email || "",
        nomor: user.data.nomor || "",
        jenis_kelamin: user.data.jenis_kelamin || "",
        agama: user.data.agama || "",
        tanggal_lahir: user.data.tanggal_lahir || "",
        tempat_lahir: user.data.tempat_lahir || "",
        unit_kerja: user.data.unit_kerja || "",
        alamat: user.data.alamat || "",
        password_lama: "",
        password_baru: "",
        password_konfirmasi: "",
      });
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate password fields if any password field is filled
    if (
      formData.password_lama ||
      formData.password_baru ||
      formData.password_konfirmasi
    ) {
      if (!formData.password_lama) {
        toast.error("Password lama harus diisi");
        return;
      }
      if (formData.password_baru !== formData.password_konfirmasi) {
        toast.error("Password baru dan konfirmasi password tidak cocok");
        return;
      }
      if (formData.password_baru && formData.password_baru.length < 6) {
        toast.error("Password baru minimal 6 karakter");
        return;
      }
    }

    // Prepare data for API
    const updateData: any = {
      nip: Number(formData.nip),
      nama: formData.nama,
      email: formData.email,
      nomor: formData.nomor,
      jenis_kelamin: formData.jenis_kelamin,
      agama: formData.agama,
      tanggal_lahir: formData.tanggal_lahir,
      tempat_lahir: formData.tempat_lahir,
      unit_kerja: formData.unit_kerja,
      alamat: formData.alamat,
    };

    // Only include password fields if they're being updated
    if (formData.password_lama && formData.password_baru) {
      updateData.password_lama = formData.password_lama;
      updateData.password = formData.password_baru;
      updateData.password_confirmation = formData.password_konfirmasi;
    }

    // Call the update mutation
    updateUser(updateData, {
      onSuccess: () => {
        // Clear password fields after successful update
        setFormData((prev) => ({
          ...prev,
          password_lama: "",
          password_baru: "",
          password_konfirmasi: "",
        }));
      },
    });
  };

  const handleCancel = () => {
    // Reset to user data
    if (user?.data) {
      setFormData({
        nip: user.data.nip?.toString() || "",
        nama: user.data.nama || "",
        email: user.data.email || "",
        nomor: user.data.nomor || "",
        jenis_kelamin: user.data.jenis_kelamin || "",
        agama: user.data.agama || "",
        tanggal_lahir: user.data.tanggal_lahir || "",
        tempat_lahir: user.data.tempat_lahir || "",
        unit_kerja: user.data.unit_kerja || "",
        alamat: user.data.alamat || "",
        password_lama: "",
        password_baru: "",
        password_konfirmasi: "",
      });
    }
  };

  if (isLoadingUser) return <SKSkeleton />;

  return (
    <div>
      <Button
        variant="default"
        onClick={() => window.history.back()}
        className="w-fit -ml-2 my-6 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        <PageHeader />

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <SectionHeader icon={User} title="Informasi Pribadi" />

          <FormField label="NIP" required>
            <TextInput
              name="nip"
              placeholder="Masukkan NIP"
              value={formData.nip}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Nama Lengkap" required>
            <TextInput
              name="nama"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={handleChange}
              required
              icon={User}
            />
          </FormField>

          <FormField label="Email" required>
            <TextInput
              name="email"
              type="email"
              placeholder="contoh@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              icon={Mail}
            />
          </FormField>

          <FormField label="Nomor Telepon" required>
            <TextInput
              name="nomor"
              type="tel"
              placeholder="082213483333"
              value={formData.nomor}
              onChange={handleChange}
              required
              icon={Phone}
            />
          </FormField>

          <FormField label="Jenis Kelamin" required>
            <SelectInput
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              options={GENDER_OPTIONS}
              placeholder="Pilih jenis kelamin"
              required
            />
          </FormField>

          <FormField label="Agama" required>
            <SelectInput
              name="agama"
              value={formData.agama}
              onChange={handleChange}
              options={RELIGION_OPTIONS}
              placeholder="Pilih agama"
              required
            />
          </FormField>

          <div className="lg:col-span-3 border-t border-gray-200 my-2" />

          <SectionHeader icon={MapPin} title="Alamat & Tempat Lahir" />

          <FormField label="Alamat Lengkap" required className="lg:col-span-3">
            <TextareaInput
              name="alamat"
              placeholder="Masukkan alamat lengkap"
              value={formData.alamat}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Tempat Lahir" required>
            <TextInput
              name="tempat_lahir"
              placeholder="Masukkan tempat lahir"
              value={formData.tempat_lahir}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Tanggal Lahir" required>
            <TextInput
              name="tanggal_lahir"
              type="date"
              placeholder=""
              value={formData.tanggal_lahir}
              onChange={handleChange}
              required
              icon={Calendar}
            />
          </FormField>

          <FormField label="Unit Kerja" required>
            <SelectInput
              name="unit_kerja"
              value={formData.unit_kerja}
              onChange={handleChange}
              options={WORK_UNIT_OPTIONS}
              placeholder="Pilih unit kerja"
              required
            />
          </FormField>

          <div className="lg:col-span-3 border-t border-gray-200 my-2" />

          <SectionHeader
            icon={Lock}
            title="Ubah Password"
            description="Kosongkan jika tidak ingin mengubah password"
          />

          <FormField label="Password Lama">
            <TextInput
              name="password_lama"
              type="password"
              placeholder="Masukkan password lama"
              value={formData.password_lama || ""}
              onChange={handleChange}
              icon={Lock}
            />
          </FormField>

          <FormField label="Password Baru">
            <TextInput
              name="password_baru"
              type="password"
              placeholder="Masukkan password baru"
              value={formData.password_baru || ""}
              onChange={handleChange}
              icon={Lock}
            />
          </FormField>

          <FormField label="Konfirmasi Password Baru">
            <TextInput
              name="password_konfirmasi"
              type="password"
              placeholder="Ulangi password baru"
              value={formData.password_konfirmasi || ""}
              onChange={handleChange}
              icon={Lock}
            />
          </FormField>

          <FormActions onCancel={handleCancel} isSubmitting={isPending} />
        </form>
      </div>
    </div>
  );
};

export default CreateDataPegawai;
