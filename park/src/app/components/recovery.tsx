"use client";
import { useEffect, useState } from "react";
import "../../styles/login.css";
import { typeRoute } from "@/hook/rootLogin";
import Link from "next/link";

export default function FormRecovery() {
  const [backToLoginHref, setBackToLoginHref] = useState<string>("");

  useEffect(() => {
    const park = localStorage.getItem("park") || "";
    const route = typeRoute(park) || "";
    setBackToLoginHref(route);
  }, []);

  return (
    <div className="login-card recovery-card" id="recoveryCard">
      <h1>Reset your password</h1>
      <form id="recoveryForm">
        <label htmlFor="recoveryEmail">Email address</label>
        <input
          type="email"
          id="recoveryEmail"
          placeholder="you@example.com"
          required
        />
        <button type="submit">Send reset link</button>
      </form>

      <div className="options">
        <Link href={backToLoginHref} id="backToLogin">
          Back to login
        </Link>
      </div>
    </div>
  );
}
