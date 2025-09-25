"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">DParking</h2>
      {/* === ROLES === */}
      <li>
        <button
          onClick={() => toggleMenu("roles")}
          className="flex w-full items-center justify-between px-3 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <FaIdBadge /> Roles
          </span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              openMenu === "roles" ? "rotate-180" : ""
            }`}
          />
        </button>
        <ul
          className={`ml-6 mt-2 space-y-1 text-sm overflow-hidden transition-all duration-300 ${
            openMenu === "roles" ? "max-h-24" : "max-h-0"
          }`}
        >
          <li>
            <Link
              href="/dashboard/rol"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/rol" ? "bg-gray-700" : ""
              }`}
            >
              <FaList /> Lista de Roles
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/rol/create"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/roles/crear" ? "bg-gray-700" : ""
              }`}
            >
              <FaPlus /> Crear Rol
            </Link>
          </li>
        </ul>
      </li>
      {/* === USUARIOS === */}
      <li>
        <button
          onClick={() => toggleMenu("usuarios")}
          className="flex w-full items-center justify-between px-3 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <FaUserFriends /> Usuarios
          </span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              openMenu === "usuarios" ? "rotate-180" : ""
            }`}
          />
        </button>
        <ul
          className={`ml-6 mt-2 space-y-1 text-sm overflow-hidden transition-all duration-300 ${
            openMenu === "usuarios" ? "max-h-24" : "max-h-0"
          }`}
        >
          <li>
            <Link
              href="/dashboard/user"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/user" ? "bg-gray-700" : ""
              }`}
            >
              <FaUserFriends /> Lista de Usuarios
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user/crear"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/user/crear" ? "bg-gray-700" : ""
              }`}
            >
              <FaPlus /> Crear Usuario
            </Link>
          </li>
        </ul>
      </li>
      {/* === TIPOS DE VEHÍCULO === */}
      <li>
        <button
          onClick={() => toggleMenu("vehiculos")}
          className="flex w-full items-center justify-between px-3 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <FaCar /> Tipos de Vehículo
          </span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              openMenu === "vehiculos" ? "rotate-180" : ""
            }`}
          />
        </button>
        <ul
          className={`ml-6 mt-2 space-y-1 text-sm overflow-hidden transition-all duration-300 ${
            openMenu === "vehiculos" ? "max-h-24" : "max-h-0"
          }`}
        >
          <li>
            <Link
              href="/dashboard/vehiculos"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/vehiculos" ? "bg-gray-700" : ""
              }`}
            >
              <FaList /> Lista de Tipos
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/vehiculos/crear"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/vehiculos/crear" ? "bg-gray-700" : ""
              }`}
            >
              <FaPlus /> Crear Tipo
            </Link>
          </li>
        </ul>
      </li>

      {/* === TARIFAS === */}
      <li>
        <button
          onClick={() => toggleMenu("tarifas")}
          className="flex w-full items-center justify-between px-3 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <FaTag /> Tarifas
          </span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              openMenu === "tarifas" ? "rotate-180" : ""
            }`}
          />
        </button>
        <ul
          className={`ml-6 mt-2 space-y-1 text-sm overflow-hidden transition-all duration-300 ${
            openMenu === "tarifas" ? "max-h-24" : "max-h-0"
          }`}
        >
          <li>
            <Link
              href="/dashboard/tarifas"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/tarifas" ? "bg-gray-700" : ""
              }`}
            >
              <FaList /> Lista de Tarifas
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/tarifas/crear"
              className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                pathname === "/dashboard/tarifas/crear" ? "bg-gray-700" : ""
              }`}
            >
              <FaPlus /> Crear Tarifa
            </Link>
          </li>
        </ul>
      </li>

      <ul className="space-y-2">
        {/* === MENSUALIDADES === */}
        <li>
          <button
            onClick={() => toggleMenu("mensualidades")}
            className="flex w-full items-center justify-between px-3 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FaList />
              Mensualidades
            </span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                openMenu === "mensualidades" ? "rotate-180" : ""
              }`}
            />
          </button>
          <ul
            className={`ml-6 mt-2 space-y-1 text-sm overflow-hidden transition-all duration-300 ${
              openMenu === "mensualidades" ? "max-h-40" : "max-h-0"
            }`}
          >
            <li>
              <Link
                href="/dashboard/mensualidades/crear"
                className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                  pathname === "/dashboard/mensualidades/crear"
                    ? "bg-gray-700"
                    : ""
                }`}
              >
                <FaPlus /> Crear Mensualidad
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/mensualidades"
                className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                  pathname === "/dashboard/mensualidades" ? "bg-gray-700" : ""
                }`}
              >
                <FaList /> Ver Mensualidades
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/mensualidades/mia"
                className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                  pathname === "/dashboard/mensualidades/mia"
                    ? "bg-gray-700"
                    : ""
                }`}
              >
                <FaUser /> Mi Mensualidad
              </Link>
            </li>
          </ul>
        </li>

        {/* === MÉTODOS DE PAGO === */}
        <li>
          <button
            onClick={() => toggleMenu("metodosPago")}
            className="flex w-full items-center justify-between px-3 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FaCreditCard /> Métodos de Pago
            </span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                openMenu === "metodosPago" ? "rotate-180" : ""
              }`}
            />
          </button>
          <ul
            className={`ml-6 mt-2 space-y-1 text-sm overflow-hidden transition-all duration-300 ${
              openMenu === "metodosPago" ? "max-h-24" : "max-h-0"
            }`}
          >
            <li>
              <Link
                href="/dashboard/metodos"
                className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                  pathname === "/dashboard/metodos" ? "bg-gray-700" : ""
                }`}
              >
                <FaList /> Lista de Métodos
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/metodos/crear"
                className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 ${
                  pathname === "/dashboard/metodos/crear" ? "bg-gray-700" : ""
                }`}
              >
                <FaPlus /> Crear Método
              </Link>
            </li>
          </ul>
        </li>

        {/* === TRANSACCIONES (SOLO ENLACE) === */}
        <li>
          <Link
            href="/dashboard/transacciones"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 ${
              pathname === "/dashboard/transacciones" ? "bg-gray-700" : ""
            }`}
          >
            <FaMoneyBill /> Transacciones
          </Link>
        </li>
      </ul>
    </aside>
  );
}
