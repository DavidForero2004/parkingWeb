"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/sidebar.css";
import {
  FaPlus,
  FaList,
  FaUser,
  FaCar,
  FaMoneyBill,
  FaUserFriends,
  FaChevronDown,
  FaCreditCard,
  FaTag,
  FaIdBadge,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("data");
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      setRole(parsed.r);
    }
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItemClass = (href: string) =>
    pathname === href ? "menu-link active" : "menu-link";

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">DParking</h2>
      <ul className="menu-list">
        {/* ROLES */}
        {role === 1 && (
          <li>
            <button className="menu-btn" onClick={() => toggleMenu("roles")}>
              <span className="menu-btn-text">
                <FaIdBadge /> Roles
              </span>
              <FaChevronDown
                className={`chevron ${openMenu === "roles" ? "rotate" : ""}`}
              />
            </button>
            <ul className={`submenu ${openMenu === "roles" ? "open" : ""}`}>
              <li>
                <Link
                  href="/dashboard/rol"
                  className={menuItemClass("/dashboard/rol")}
                >
                  <FaList /> Lista de Roles
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/rol/create"
                  className={menuItemClass("/dashboard/rol/create")}
                >
                  <FaPlus /> Crear Rol
                </Link>
              </li>
            </ul>
          </li>
        )}

        {/* USUARIOS */}
        {(role === 1 || role === 2) && (
          <li>
            <button
              className="menu-btn"
              onClick={() => toggleMenu("usuarios")}
            >
              <span className="menu-btn-text">
                <FaUserFriends /> Usuarios
              </span>
              <FaChevronDown
                className={`chevron ${openMenu === "usuarios" ? "rotate" : ""}`}
              />
            </button>
            <ul
              className={`submenu ${openMenu === "usuarios" ? "open" : ""}`}
            >
              <li>
                <Link
                  href="/dashboard/user"
                  className={menuItemClass("/dashboard/user")}
                >
                  <FaUserFriends /> Lista de Usuarios
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/user/create"
                  className={menuItemClass("/dashboard/user/create")}
                >
                  <FaPlus /> Crear Usuario
                </Link>
              </li>
            </ul>
          </li>
        )}

        {/* TIPOS DE VEHÍCULO */}
        {role === 1 && (
          <li>
            <button
              className="menu-btn"
              onClick={() => toggleMenu("vehiculos")}
            >
              <span className="menu-btn-text">
                <FaCar /> Tipos de Vehículo
              </span>
              <FaChevronDown
                className={`chevron ${openMenu === "vehiculos" ? "rotate" : ""}`}
              />
            </button>
            <ul
              className={`submenu ${openMenu === "vehiculos" ? "open" : ""}`}
            >
              <li>
                <Link
                  href="/dashboard/vehiculos"
                  className={menuItemClass("/dashboard/vehiculos")}
                >
                  <FaList /> Lista de Tipos
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/vehiculos/crear"
                  className={menuItemClass("/dashboard/vehiculos/crear")}
                >
                  <FaPlus /> Crear Tipo
                </Link>
              </li>
            </ul>
          </li>
        )}

        {/* TARIFAS */}
        {(role === 1 || role === 2) && (
          <li>
            <button className="menu-btn" onClick={() => toggleMenu("tarifas")}>
              <span className="menu-btn-text">
                <FaTag /> Tarifas
              </span>
              <FaChevronDown
                className={`chevron ${openMenu === "tarifas" ? "rotate" : ""}`}
              />
            </button>
            <ul className={`submenu ${openMenu === "tarifas" ? "open" : ""}`}>
              <li>
                <Link
                  href="/dashboard/tarifas"
                  className={menuItemClass("/dashboard/tarifas")}
                >
                  <FaList /> Lista de Tarifas
                </Link>
              </li>
              {role === 1 && (
                <li>
                  <Link
                    href="/dashboard/tarifas/crear"
                    className={menuItemClass("/dashboard/tarifas/crear")}
                  >
                    <FaPlus /> Crear Tarifa
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* MENSUALIDADES */}
        {(role === 1 || role === 2) && (
          <li>
            <button
              className="menu-btn"
              onClick={() => toggleMenu("mensualidades")}
            >
              <span className="menu-btn-text">
                <FaList /> Mensualidades
              </span>
              <FaChevronDown
                className={`chevron ${openMenu === "mensualidades" ? "rotate" : ""}`}
              />
            </button>
            <ul
              className={`submenu ${openMenu === "mensualidades" ? "open" : ""}`}
            >
              {role === 1 && (
                <li>
                  <Link
                    href="/dashboard/mensualidades/crear"
                    className={menuItemClass("/dashboard/mensualidades/crear")}
                  >
                    <FaPlus /> Crear Mensualidad
                  </Link>
                </li>
              )}
              {role === 1 && (
                <li>
                  <Link
                    href="/dashboard/mensualidades"
                    className={menuItemClass("/dashboard/mensualidades")}
                  >
                    <FaList /> Ver Mensualidades
                  </Link>
                </li>
              )}
              {role !== 1 && role !== 2 && (
                <li>
                  <Link
                    href="/dashboard/mensualidades/mia"
                    className={menuItemClass("/dashboard/mensualidades/mia")}
                  >
                    <FaUser /> Mi Mensualidad
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* MÉTODOS DE PAGO */}
        {role === 1 && (
          <li>
            <button
              className="menu-btn"
              onClick={() => toggleMenu("metodosPago")}
            >
              <span className="menu-btn-text">
                <FaCreditCard /> Métodos de Pago
              </span>
              <FaChevronDown
                className={`chevron ${openMenu === "metodosPago" ? "rotate" : ""}`}
              />
            </button>
            <ul
              className={`submenu ${openMenu === "metodosPago" ? "open" : ""}`}
            >
              <li>
                <Link
                  href="/dashboard/metodos"
                  className={menuItemClass("/dashboard/metodos")}
                >
                  <FaList /> Lista de Métodos
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/metodos/crear"
                  className={menuItemClass("/dashboard/metodos/crear")}
                >
                  <FaPlus /> Crear Método
                </Link>
              </li>
            </ul>
          </li>
        )}

        {/* TRANSACCIONES */}
        {role === 1 && (
          <li>
            <Link
              href="/dashboard/transacciones"
              className={menuItemClass("/dashboard/transacciones")}
            >
              <FaMoneyBill /> Transacciones
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
