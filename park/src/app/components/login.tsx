"use client";

import Link from "next/link";
import "../../styles/login.css";
import { useEffect, useState } from "react";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook/useToast";

type FormLoginProps = {
  titlePark: string;
  numberPark: number;
};

export default function FormLogin({ numberPark, titlePark }: FormLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showToast } = useToast(); 

  useEffect(() => {
    localStorage.setItem("park", numberPark.toString());
  }, [numberPark]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login({
        endpoint: "/login",
        email,
        password,
      });

      if (data.token) {
        const now = new Date().getTime();

        // Guardar token y hora de creación
        localStorage.setItem("token", data.token);
        localStorage.setItem("token_createdAt", now.toString());
        sessionStorage.setItem("data", JSON.stringify(data.user));

        showToast("Has iniciado sesión correctamente", "success");
        router.push("/dashboard");
      }
    } catch {
      //console.error("Error al iniciar sesión:", error);
      showToast("Usuario o contraseña incorrectos", "error");
    }
  };

  return (
    <>
     
      <div className="login-container flex items-center justify-center min-h-screen ">
        <div className="login-card p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">{titlePark}</h1>
          <form id="loginForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </form>

          <div className="options flex justify-center items-center mt-4 text-sm text-gray-600 gap-2">
            <Link href="/recovery" className="hover:underline">Ir a Recovery</Link>
            <span>•</span>
            <a href="#" className="hover:underline">Create an account</a>
          </div>
        </div>
      </div>
    </>
  );
}
