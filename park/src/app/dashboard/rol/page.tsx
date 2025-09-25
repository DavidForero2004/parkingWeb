"use client";

import { useEffect, useState } from "react";
import { deleteRol, getRols, updateRol } from "@/services/api"; 
import { FaEdit, FaTrash } from "react-icons/fa";

interface Rol {
  id: number;
  nombre: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Estado para modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Estado para el rol seleccionado
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null);
  const [editNombre, setEditNombre] = useState("");

  // === Cargar roles desde API ===
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRols({ endpoint: "/rol" });
      if (data) setRoles(data);
    };
    fetchData();
  }, []);

  // === Filtro de búsqueda ===
  const filtered = roles.filter((rol) =>
    rol.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // === Paginación ===
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  // === Acciones ===
  const openEditModal = (rol: Rol) => {
    setSelectedRol(rol);
    setEditNombre(rol.nombre);
    setShowEditModal(true);
  };

  const openDeleteModal = (rol: Rol) => {
    setSelectedRol(rol);
    setShowDeleteModal(true);
  };

 const handleUpdate = async () => {
  if (selectedRol) {
    const updated = await updateRol({
      endpoint: "/rol/update", 
      id: selectedRol.id,
      nombre: editNombre,
    });

    if (updated) {
      // actualizar tabla en frontend
      setRoles(roles.map((rol) =>
        rol.id === selectedRol.id ? { ...rol, nombre: editNombre } : rol
      ));
      setShowEditModal(false);
    }
  }
};


  const handleDelete = async () => {
  if (selectedRol) {
    const response = await deleteRol({ endpoint: "/rol/delete", id: selectedRol.id });

    if (response) {
      setRoles(roles.filter((rol) => rol.id !== selectedRol.id));
      setShowDeleteModal(false);
    } else {
      alert("Error al eliminar el rol");
    }
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Roles</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar rol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-800 rounded-md shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((rol, index) => (
              <tr key={rol.id} className="border-b border-gray-300">
                {/* ID autoincremental visible */}
                <td className="px-4 py-2">{startIndex + index + 1}</td>

                {/* Nombre */}
                <td className="px-4 py-2">{rol.nombre}</td>

                {/* Botones */}
                <td className="px-4 py-2 flex justify-center gap-3">
                  {/* ID original oculto */}
                  <input type="hidden" value={rol.id} />

                  <button
                    onClick={() => openEditModal(rol)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDeleteModal(rol)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No se encontraron roles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4 text-gray-700">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* === MODAL EDITAR === */}
      {showEditModal && selectedRol && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <div className="bg-white text-gray-800 p-6 rounded-md w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar Rol</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              {/* ID oculto */}
              <input type="hidden" value={selectedRol.id} />

              {/* Nombre */}
              <div className="mb-4">
                <label className="block mb-1">Nombre</label>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL ELIMINAR === */}
      {showDeleteModal && selectedRol && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <div className="bg-white text-gray-800 p-6 rounded-md w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Eliminar Rol</h2>
            <p>¿Seguro que deseas eliminar el rol: <b>{selectedRol.nombre}</b>?</p>

            {/* ID oculto */}
            <input type="hidden" value={selectedRol.id} />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
