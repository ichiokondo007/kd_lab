"use client";
//login
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/axios";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await apiClient.login(id, password);

      if (response.data.redirectTo) {
        // 画面遷移前に少し待機（状態の更新を確実にするため）
        setTimeout(() => {
          router.push(response.data.redirectTo);
        }, 100);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setErrorMessage("IDまたはパスワードが正しくありません");
      } else {
        setErrorMessage("エラーが発生しました。再度お試しください。");
      }
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="/images/1.jpeg"
          //src="/images/login_image.jpg"
          // src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          {/* ID Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-800">
              User ID
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800"
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800"
              autoComplete="off"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className={`bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full ${id && password ? "" : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!id || !password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
