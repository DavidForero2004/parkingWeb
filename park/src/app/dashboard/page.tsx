"use client";

import NavBar from "@/app/components/nav";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [nombre, setNombre] = useState<string>("");

  useEffect(() => {
    const data = sessionStorage.getItem("data"); 
    if (data) {
        const parsed = JSON.parse(data)
      setNombre(parsed.nombre);
    }
  }, []);

  return <NavBar nombre={nombre} />;
}
