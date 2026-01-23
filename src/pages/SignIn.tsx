import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import useLoginUser from "@/features/user/useLoginUser";
import favicon from "@/assets/favicon.ico";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ nip, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Login Card */}
      <Card className="relative w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
        <div className="p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl  mb-4 shadow-lg">
              <img className="w-8 h-8" src={favicon} alt="logo" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang
            </h1>
            <p className="text-gray-600">Silakan masuk ke akun Anda</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* nip Input */}
            <div className="space-y-2">
              <Label htmlFor="nip" className="text-gray-700 font-medium">
                Nip
              </Label>
              <div className="relative">
                <Input
                  onChange={({ target }) => setNip(target.value)}
                  id="nip"
                  type="number"
                  placeholder="Contoh: 19894858393922"
                  className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  onChange={({ target }) => setPassword(target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Ingat saya
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Lupa password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-primary hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </div>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Daftar sekarang
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

export default SignIn;
