"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/services/api";
import "../../styles/nav.css";



export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login/adminPark");
    }
  }, [router]);

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
        {/* Logo */}
        <div className="nav-logo" onClick={() => router.push("/dashboard")}>
          D
        </div>

        {/* Menu desktop */}
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
        
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
     
        </div>

        {/* Botón móvil */}
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
