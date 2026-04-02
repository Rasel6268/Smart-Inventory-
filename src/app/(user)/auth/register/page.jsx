"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import toast from "react-hot-toast";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { register } = useAuth();
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  const {name,email,password} = formData
    try {
   
     const user =   await register(name,email,password);
     if(user.status == 201){
      toast.success(user.data.message)
       router.push("/auth/login")
     }
     console.log("this user data",user.status
);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-600 mb-2 text-center">
            Create Account
          </h1>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={registerHandler} className="space-y-5">
            {/* Name */}
            <div className="group">
              <label className="text-gray-700 text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-4 py-3 border-2 border-blue-400 rounded-xl focus:outline-none placeholder:text-gray-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-3 border-2 border-blue-400 rounded-xl focus:outline-none placeholder:text-gray-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-xl focus:outline-none placeholder:text-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/3 right-2 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;