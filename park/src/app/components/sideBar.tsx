"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "📅 Crear Mensualidad", href: "/dashboard/mensualidades/crear" },
  { title: "📊 Ver Mensualidades", href: "/dashboard/mensualidades" },
  { title: "🔎 Mi Mensualidad", href: "/dashboard/mensualidades/mia" },
  { title: "🏢 Parqueaderos", href: "/dashboard/parqueaderos" },
  { title: "👥 Usuarios", href: "/dashboard/usuarios" },
  { title: "💰 Transacciones", href: "/dashboard/transacciones" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">DParking</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
