"use client";
//login
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/axios";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // エラーメッセージを消すタイマーをクリアするための参照を保持
  const errorTimerRef = useRef<NodeJS.Timeout>();

  // エラーメッセージを設定する関数
  const showError = (message: string) => {
    // 既存のタイマーがあればクリア
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    setErrorMessage(message);

    // 5秒後にメッセージを消す
    errorTimerRef.current = setTimeout(() => {
      setErrorMessage("");
    }, 5000); // 5000ミリ秒 = 5秒
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await apiClient.login(id, password);
      if (response.data.redirectTo) {
        setTimeout(() => {
          router.push(response.data.redirectTo);
        }, 100);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        showError("IDまたはパスワードが正しくありません");
      } else {
        showError("エラーが発生しました。再度お試しください。");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-login-bg flex justify-center items-center h-screen font-montserrat">
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
      <div className="bg-login-bg lg:p-26 md:p-52 sm:20 p-8 w-full lg:w-3/5">
        <h1 className="text-6xl font-bold mb-9">KD.Lab Login</h1>
        <form onSubmit={handleLogin}>
          {/* ID Input */}
          <div className="mb-4 text-2xl">
            <label htmlFor="username" className="block text-white-800 font-montserrat">
              User ID
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-800"
              autoComplete="off"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 text-2xl">
            <label htmlFor="password" className="block text-white-800">
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
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}
          {/* Login Button */}
          <button
            type="submit"
            className={`text-2xl bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full ${id && password ? "" : "opacity-50 cursor-not-allowed"
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
