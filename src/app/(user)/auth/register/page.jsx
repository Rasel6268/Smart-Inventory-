"use client";
import api from "@/config/api/api";
import React, { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChanage = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const registerHander = async(e) => {
    e.preventDefault();
    const res = await api.post("/auth/register", formData);
      console.log(res.data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className=" p-6">
          <h1 className="text-3xl font-bold text-gray-600 mb-2 text-center">
            Create Account
          </h1>
          <form action="" onSubmit={registerHander} className="space-y-5">
            <div className="group">
              <label className="text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChanage}
                className="w-full px-4 py-3 border-2 border-blue-400 rounded-xl  focus:outline-none transition-all duration-300 group-hover:border-green-300 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className=" text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChanage}
                className="w-full px-4 py-3 border-2 border-blue-400 rounded-xl  focus:outline-none transition-all duration-300 group-hover:border-green-300 placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className=" text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                {" "}
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChanage}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-xl  focus:outline-none transition-all duration-300 group-hover:border-green-300 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/3 right-2  cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex  gap-1">
                  <div
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${formData.password.length > 0 ? "bg-red-500" : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${formData.password.length > 4 ? "bg-yellow-500" : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${formData.password.length > 7 ? "bg-green-500" : "bg-gray-200"}`}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.password.length === 0 && "Enter a password"}
                  {formData.password.length > 0 &&
                    formData.password.length <= 4 &&
                    "Weak password"}
                  {formData.password.length > 7 && "Strong password!"}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 relative overflow-hidden group  cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
