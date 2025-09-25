"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/services/api";
import "../../styles/nav.css";

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Función para validar expiración de token
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    const createdAt = localStorage.getItem("token_createdAt");

    if (!token || !createdAt) {
      router.push("/login/adminPark");
      return;
    }

    const elapsedMs = Date.now() - parseInt(createdAt);
    const elapsedMinutes = elapsedMs / 1000 / 60 / 60 ;

    if (elapsedMinutes >= 1) { // más de 1 hora
      alert("Tu sesión ha expirado. Por favor vuelve a iniciar sesión.");
      localStorage.removeItem("token");
      localStorage.removeItem("token_createdAt");
      sessionStorage.removeItem("data");
      router.push("/login/adminPark");
    }
  };

  useEffect(() => {
    // Revisar al cargar el componente
    checkTokenExpiration();

    // Revisar cada 10 segundos para actualizar expiración
    const interval = setInterval(checkTokenExpiration, 10000);

    return () => clearInterval(interval);
  }, );

  const handleLogout = async () => {
    try {
      await logOut({ endpoint: "/logOut" });
      router.push("/login/adminPark");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => router.push("/dashboard")}>
          D
        </div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
