"use client";

import { useEffect, useState } from "react";
import { deleteRol, getRols, updateRol } from "@/services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useToast } from "@/hook/useToast";
import { PropsRol } from "@/model/rol";

export default function RolesPage() {
  const { showToast } = useToast();

  const [roles, setRoles] = useState<PropsRol[]>([]);
  const [selectedRol, setSelectedRol] = useState<PropsRol | null>(null);
  const [editNombre, setEditNombre] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cargar roles
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRols({ endpoint: "/rol" });
      if (data) setRoles(data);
      else showToast("Error al cargar los roles", "error");
    };
    fetchData();
  },);

  // Filtrar roles
  const filtered = roles.filter((rol) =>
    rol.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const openEditModal = (rol: PropsRol) => {
    setSelectedRol(rol);
    setEditNombre(rol.nombre || "");
    setShowEditModal(true);
  };

  const openDeleteModal = (rol: PropsRol) => {
    setSelectedRol(rol);
    setShowDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedRol) return;
    const updated = await updateRol({
      endpoint: "/rol/update",
      id: selectedRol.id,
      nombre: editNombre,
    });
    if (updated) {
      setRoles(
        roles.map((rol) =>
          rol.id === selectedRol.id ? { ...rol, nombre: editNombre } : rol
        )
      );
      setShowEditModal(false);
      showToast("Rol actualizado correctamente", "success");
    } else showToast("Error al actualizar el rol", "error");
  };

  const handleDelete = async () => {
    if (!selectedRol) return;
    const response = await deleteRol({ endpoint: "/rol/delete", id: selectedRol.id });
    if (response) {
      setRoles(roles.filter((rol) => rol.id !== selectedRol.id));
      setShowDeleteModal(false);
      showToast("Rol eliminado correctamente", "success");
    } else showToast("Error al eliminar el rol", "error");
  };

  return (
    <div className="page-container">
      <div className="data-container-global">
        <h1 className="page-title">Gestión de Roles</h1>

        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-global"
        />

        <div className="table-wrapper">
          <table className="table-global">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th className="column-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((rol, index) => (
                  <tr key={rol.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{rol.nombre}</td>
                    <td className="actions-global">
                      <button onClick={() => openEditModal(rol)} className="btn-edit-global">
                        <FaEdit />
                      </button>
                      <button onClick={() => openDeleteModal(rol)} className="btn-delete-global">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="no-data-global">
                    No se encontraron datos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="pagination-global">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>

        {/* MODAL EDITAR */}
        {showEditModal && selectedRol && (
          <div className="modal-global">
            <div className="modal-content-global">
              <h2 className="modal-title-global">Editar</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="form-group-global">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                    className="input-global"
                  />
                </div>
                <div className="modal-buttons-global">
                  <button type="button" onClick={() => setShowEditModal(false)} className="btn-cancel-global">
                    Cancelar
                  </button>
                  <button type="submit" className="btn-submit-global">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL ELIMINAR */}
        {showDeleteModal && selectedRol && (
          <div className="modal-global">
            <div className="modal-content-global">
              <h2 className="modal-title-global">Eliminar</h2>
              <p>
                ¿Seguro que deseas eliminar: <b>{selectedRol.nombre}</b>?
              </p>
              <div className="modal-buttons-global">
                <button onClick={() => setShowDeleteModal(false)} className="btn-cancel-global">Cancelar</button>
                <button onClick={handleDelete} className="btn-delete-global">Eliminar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
