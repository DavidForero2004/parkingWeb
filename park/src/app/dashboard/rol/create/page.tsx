"use client";

import { useState } from "react";
import { createRol } from "@/services/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook/useToast"; 
export default function CreateRolPage() {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast(); // <-- Inicializa el hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createRol({
      endpoint: "/rol/new",
      nombre,
    });

    setLoading(false);

    if (result) {
      showToast("Rol creado exitosamente", "success"); // <-- Mensaje de éxito
      router.push("/dashboard/rol");
    } else {
      showToast("Error al crear el rol", "error"); // <-- Mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="bg-white text-gray-800 p-6 rounded-md w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Rol</h1>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nombre del Rol</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Administrador"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/rol")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
