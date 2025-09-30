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
    <div className="page-create-container">
      <div className="form-container-global">
        <h1 className="modal-title-global">Crear Rol</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group-global">
            <label>Nombre del Rol</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Administrador"
              required
              className="input-global"
            />
          </div>

          <div className="form-buttons-global">
            <button
              type="button"
              onClick={() => router.push("/dashboard/rol")}
              className="btn-cancel-global"
            >
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-submit-global">
              {loading ? "Creando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
