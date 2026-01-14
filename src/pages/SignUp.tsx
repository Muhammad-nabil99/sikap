import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import useSignUpUser from "@/features/user/useSignUpUser";

interface Inputs {
  nama: string;
  email: string;
  password: string;
  password_confirmation: string;
  nip: number;
  nomor: number;
  jenis_kelamin: string;
  agama: string;
  alamat: string;
  tempat_lahir: string;
  tanggal_lahir: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<Inputs>();

  const { signUp, isPending } = useSignUpUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const onSubmit = (data: Inputs) => {
    console.log("data sign up", data);

    const newUser = {
      nomor: Number(data.nomor),
      nip: Number(data.nip),
      ...data,
    };
    console.log("newUser", newUser);

    signUp(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <Card className="relative w-full max-w-lg bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
        <div className="p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg">
              <img
                className="w-8 h-8"
                src="../../public/favicon.ico"
                alt="logo"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Daftar Akun Baru
            </h1>
            <p className="text-gray-600">
              Silakan lengkapi data diri Anda untuk mendaftar
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1: Nama, Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-gray-700 font-medium">
                  Nama Lengkap
                </Label>
                <Input
                  id="nama"
                  placeholder="Masukkan nama Anda"
                  {...register("nama", { required: "Nama wajib diisi" })}
                />
                {errors.nama && (
                  <p className="text-xs text-red-500">{errors.nama.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  {...register("email", { required: "Email wajib diisi" })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Password, Password Confirmation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    {...register("password", {
                      required: "Password wajib diisi",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label
                  htmlFor="password_confirmation"
                  className="text-gray-700 font-medium"
                >
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password_confirmation"
                    type={showConfirmationPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    {...register("password_confirmation", {
                      required: "Konfirmasi password wajib diisi",
                      validate: (value) =>
                        value == getValues("password") || "password tidak sama",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmationPassword(!showConfirmationPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmationPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-xs text-red-500">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: NIP, Nomor Telepon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nip" className="text-gray-700 font-medium">
                  NIP
                </Label>
                <Input
                  id="nip"
                  type="number"
                  placeholder="Contoh: 1989..."
                  {...register("nip", { required: "NIP wajib diisi" })}
                />
                {errors.nip && (
                  <p className="text-xs text-red-500">{errors.nip.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomor" className="text-gray-700 font-medium">
                  Nomor Telepon (WA)
                </Label>
                <Input
                  id="nomor"
                  type="number"
                  placeholder="Contoh: 62812..."
                  {...register("nomor", { required: "Nomor wajib diisi" })}
                />
                {errors.nomor && (
                  <p className="text-xs text-red-500">{errors.nomor.message}</p>
                )}
              </div>
            </div>

            {/* Row 4: Jenis Kelamin, Agama */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="jenis_kelamin"
                  className="text-gray-700 font-medium"
                >
                  Jenis Kelamin
                </Label>

                <Controller
                  name="jenis_kelamin"
                  control={control}
                  rules={{ required: "Jenis kelamin wajib dipilih" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="jenis_kelamin">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.jenis_kelamin && (
                  <p className="text-xs text-red-500">
                    {errors.jenis_kelamin.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Controller
                  name="agama"
                  control={control}
                  rules={{ required: "Agama wajib dipilih" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="agama">
                        <SelectValue placeholder="Pilih agama" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="islam">Islam</SelectItem>
                        <SelectItem value="kristen">Kristen</SelectItem>
                        <SelectItem value="katolik">Katolik</SelectItem>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="buddha">Buddha</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.agama && (
                  <p className="text-xs text-red-500">
                    {errors.agama.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Row 5: Tempat Lahir, Tanggal Lahir */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="tempat_lahir"
                  className="text-gray-700 font-medium"
                >
                  Tempat Lahir
                </Label>
                <Input
                  id="tempat_lahir"
                  placeholder="Contoh: Kendari"
                  {...register("tempat_lahir", {
                    required: "tempat lahir wajib diisi",
                  })}
                />
                {errors.tempat_lahir && (
                  <p className="text-xs text-red-500">
                    {errors.tempat_lahir.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="tanggal_lahir"
                  className="text-gray-700 font-medium"
                >
                  Tanggal Lahir
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="tanggal_lahir"
                    type="date"
                    className="pl-10"
                    {...register("tanggal_lahir", {
                      required: "tanggal lahir wajib diisi",
                    })}
                  />
                  {errors.tanggal_lahir && (
                    <p className="text-xs text-red-500">
                      {errors.tanggal_lahir.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Row 6: Alamat */}
            <div className="space-y-2">
              <Label htmlFor="alamat" className="text-gray-700 font-medium">
                Alamat Lengkap
              </Label>
              <Input
                id="alamat"
                placeholder="Masukkan alamat lengkap Anda"
                {...register("alamat", { required: "alamat wajib diisi" })}
              />
              {errors.alamat && (
                <p className="text-xs text-red-500">{errors.alamat.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-primary hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all mt-8"
            >
              {isPending ? "Memproses..." : "Daftar Sekarang"}
            </Button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Masuk
            </Link>
          </p>
        </div>

        <div className="text-center py-5 text-black/50 text-xs">
          <p>© 2024 Sistem Kepegawaian. All rights reserved.</p>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
