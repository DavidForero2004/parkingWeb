"use client";
import Link from "next/link";
import "../../styles/login.css";
import { useEffect } from "react";

type FormLoginProps = {
  titlePark: string;
  numberPark: number;
};

export default function FormLogin({ numberPark, titlePark }: FormLoginProps) {

  useEffect(() => {
    sessionStorage.setItem('park', numberPark.toString());
  }, [numberPark]);


  return (
    <div className="login-container">
      {/* LOGIN CARD */}
      <div className="login-card" id="loginCard">
        <h1>{titlePark}</h1>
        <form id="loginForm">
          <input type="hidden" value={numberPark} />

          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <button type="submit">Sign in</button>
        </form>

        <div className="options">
          <Link
            href={{
              pathname: "/recovery"
            }}
          >
            Ir a Recovery
          </Link>
          <span>•</span>
          <a href="#">Create an account</a>
        </div>
      </div>
    </div>
  );
}
