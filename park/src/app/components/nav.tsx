"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/services/api";
import "../../styles/nav.css";
import { useToast } from "@/hook/useToast";
import { typeRoute } from "@/hook/rootLogin";

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  // Función para validar expiración de token
  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem("token");
    const createdAt = localStorage.getItem("token_createdAt");
    const park = localStorage.getItem("park") || "";; // obtenemos park

    if (!token || !createdAt) {
      const route = typeRoute(park); // obtenemos la ruta según park
      setTimeout(() => router.push(route || ""), 100);
      return;
    }

    const elapsedMs = Date.now() - parseInt(createdAt);
    const elapsedHours = elapsedMs / 1000 / 60 / 60;

    if (elapsedHours >= 1) {
      showToast(
        "Tu sesión ha expirado. Por favor vuelve a iniciar sesión.",
        "alert"
      );
      localStorage.removeItem("token");
      localStorage.removeItem("token_createdAt");
      sessionStorage.removeItem("data");

      const route = typeRoute(park);
      setTimeout(() => router.push(route || ""), 100); 
    }
  }, [router, showToast]);

  useEffect(() => {
    // Revisar al cargar el componente
    checkTokenExpiration();

    // Revisar cada 10 segundos para actualizar expiración
    const interval = setInterval(checkTokenExpiration, 10000);

    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  const handleLogout = async () => {
    try {
      await logOut({ endpoint: "/logOut" });
      showToast("Sesión cerrada", "alert");
      setTimeout(() => {
        const park = localStorage.getItem("park") || "";;
        const route = typeRoute(park);
        router.push(route || "");
      }, 100); 
    } catch {
      showToast("Error al cerrar sesión", "alert");
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
