"use client";
import Link from "next/link";
import "../../styles/login.css";
import { useEffect, useState } from "react";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";

type FormLoginProps = {
  titlePark: string;
  numberPark: number;
};

export default function FormLogin({ numberPark, titlePark }: FormLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("data",JSON.stringify(data.user))
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" id="loginCard">
        <h1>{titlePark}</h1>
        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign in</button>
        </form>

        <div className="options">
          <Link href="/recovery">Ir a Recovery</Link>
          <span>•</span>
          <a href="#">Create an account</a>
        </div>
      </div>
    </div>
  );
}
