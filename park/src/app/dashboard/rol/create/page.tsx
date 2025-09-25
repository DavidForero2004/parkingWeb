"use client";

import { useState } from "react";
import { createRol } from "@/services/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook/useToast"; 

export default function CreateRolPage() {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createRol({
      endpoint: "/rol/new",
      nombre,
    });

    setLoading(false);

    if (result) {
      showToast("Rol creado exitosamente", "success");
      router.push("/dashboard/rol");
    } else {
      showToast("Error al crear el rol", "error");
    }
  };

  return (
    <div className="create-rol-page">
      <div className="form-container">
        <h1>Crear Rol</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Rol</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Administrador"
              required
            />
          </div>

          <div className="form-buttons">
            <button
              type="button"
              onClick={() => router.push("/dashboard/rol")}
              className="cancel-btn"
            >
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Creando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
