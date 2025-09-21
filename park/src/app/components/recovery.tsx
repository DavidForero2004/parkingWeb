"use client";
import { useEffect, useState } from "react";
import "../../styles/login.css";


export default function FormRecovery({
}) {

   const [parkRef, setPark]  = useState<string | null>(null);

  useEffect(() => {
    const park = sessionStorage.getItem('park');
    setPark(park);
  }, []);
  
  console.log(parkRef);

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
        <a href="#" id="backToLogin">
          Back to login
        </a>
      </div>
    </div>
  );
}
