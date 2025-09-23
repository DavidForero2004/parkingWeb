"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [user, setNombre] = useState<string>("");
  
    useEffect(() => {
      const data = sessionStorage.getItem("data");
      if (data) {
        const parsed = JSON.parse(data);
        setNombre(parsed.user);
      }
    }, []);

  return (
    <div>
      <h1>Bienvenido al Dashboard: {user}</h1>
      <p>Selecciona una opción en el menú lateral.</p>
    </div>
  );
}
