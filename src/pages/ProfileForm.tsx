import React, { useState, ChangeEvent, FormEvent } from "react";

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  avatar: string | null;
}

const ProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    password: "",
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

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-100">
      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Ubah Profil</h1>
        <p className="capitalize text-gray-500 text-sm mt-1">
          Perbaruhi data diri data pengaturan akun.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
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
        </div>

        {/* Name Field */}
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

        {/* Email Field */}
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

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
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

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
