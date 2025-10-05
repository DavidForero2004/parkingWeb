"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
  getRols,
  getParking,
} from "@/services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useToast } from "@/hook/useToast";
import { PropsUser } from "@/model/user";
import { PropsRol } from "@/model/rol";
import { PropsParking } from "@/model/parking";

export default function UsersPage() {
  const { showToast } = useToast();

  // Estados principales
  const [users, setUsers] = useState<PropsUser[]>([]);
  const [roles, setRoles] = useState<PropsRol[]>([]);
  const [parkings, setParkings] = useState<PropsParking[]>([]);

  const [selectedUser, setSelectedUser] = useState<PropsUser | null>(null);

  // Campos de edición
  const [editNombre, setEditNombre] = useState("");
  const [editApellido, setEditApellido] = useState("");
  const [editCedula, setEditCedula] = useState(""); // 🔹 añadir cedula
  const [editEmail, setEditEmail] = useState("");
  const [edittelefono, setEdittelefono] = useState(""); // 🔹 telefono, no telefono
  const [editRol, setEditRol] = useState<number | undefined>(undefined);
  const [editParking, setEditParking] = useState<number | undefined>(undefined);

  // Filtros y paginación
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cargar datos
  useEffect(() => {
     const token = localStorage.getItem("token");     
      if (!token) return;
    const fetchData = async () => {
      try {
        const usersData = await getUsers({ endpoint: "/user" });

        if (usersData) setUsers(usersData);
        else showToast("Error al cargar los usuarios", "error");

        const rolesData = await getRols({ endpoint: "/rol" });
        if (rolesData) setRoles(rolesData);

        const parkingData = await getParking({ endpoint: "/parking" });
        if (parkingData) setParkings(parkingData);
      } catch (error) {
        console.error(error);
        showToast("Error al cargar los datos", "error");
      }
    };

    fetchData();
  });

  // Filtrar usuarios
  const filtered = users.filter((u) =>
    `${u.nombre} ${u.apellido}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Abrir modal de edición
  const openEditModal = (user: PropsUser) => {
    setSelectedUser(user);
    setEditNombre(user.nombre || "");
    setEditApellido(user.apellido || "");
    setEditCedula(user.cedula || "");
    setEditEmail(user.email || "");
    setEdittelefono(user.telefono || "");
    setEditRol(user.rol_id);
    setEditParking(user.parking_id);
    setShowEditModal(true);
  };

  // Abrir modal de eliminación
  const openDeleteModal = (user: PropsUser) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Actualizar usuario
  const handleUpdate = async () => {
    if (!selectedUser) return;

    const updated = await updateUser({
      endpoint: "/user",
      id: selectedUser.id,
      nombre: editNombre,
      apellido: editApellido,
      cedula: editCedula, // 🔹 enviar cedula
      email: editEmail,
      telefono: edittelefono, // 🔹 enviar telefono
      rol_id: editRol,
      parking_id: editParking,
    });

    if (updated) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                nombre: editNombre,
                apellido: editApellido,
                cedula: editCedula,
                email: editEmail,
                telefono: edittelefono,
                rol_id: editRol,
                parking_id: editParking,
              }
            : u
        )
      );
      setShowEditModal(false);
      showToast("Usuario actualizado correctamente", "success");
    } else {
      showToast("Error al actualizar el usuario", "error");
    }
  };

  // Eliminar usuario
  const handleDelete = async () => {
    if (!selectedUser) return;

    const response = await deleteUser({
      endpoint: "/user",
      id: selectedUser.id,
    });

    if (response) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      showToast("Usuario eliminado correctamente", "success");
    } else {
      showToast("Error al eliminar el usuario", "error");
    }
  };

  return (
    <div className="page-container">
      <div className="data-container-global">
        <h1 className="page-title">Gestión de Usuarios</h1>

        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-global"
        />

        {/* Tabla */}
        <div className="table-wrapper">
          <table className="table-global">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Parqueadero</th>
                <th className="column-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((u, index) => (
                  <tr key={u.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.cedula}</td>
                    <td>{u.email}</td>
                    <td>{u.telefono}</td>
                    <td>
                      {roles.find((r) => r.id === u.rol_id)?.nombre ||
                        "Sin rol"}
                    </td>
                    <td>
                      {parkings.find((p) => p.id === u.parking_id)?.nombre ||
                        "Sin parqueadero"}
                    </td>
                    <td className="actions-global">
                      <button
                        onClick={() => openEditModal(u)}
                        className="btn-edit-global"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => openDeleteModal(u)}
                        className="btn-delete-global"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="no-data-global">
                    No se encontraron usuarios
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

        {/* Modal Editar */}
        {showEditModal && selectedUser && (
          <div className="modal-global">
            <div className="modal-content-global">
              <h2 className="modal-title-global">Editar Usuario</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="row-group">
                  <div className="form-group-global">
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                      className="input-global"
                    />
                  </div>
                  <div className="form-group-global">
                    <label>Apellido</label>
                    <input
                      type="text"
                      value={editApellido}
                      onChange={(e) => setEditApellido(e.target.value)}
                      className="input-global"
                    />
                  </div>
                </div>
                <div className="row-group">
                  <div className="form-group-global">
                    <label>Cédula</label>
                    <input
                      type="text"
                      value={editCedula}
                      onChange={(e) => setEditCedula(e.target.value)}
                      className="input-global"
                    />
                  </div>
                  <div className="form-group-global">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="input-global"
                    />
                  </div>
                </div>
                <div className="row-group">
                  <div className="form-group-global">
                    <label>Teléfono</label>
                    <input
                      type="text"
                      value={edittelefono}
                      onChange={(e) => setEdittelefono(e.target.value)}
                      className="input-global"
                    />
                  </div>
                  <div className="form-group-global">
                    <label>Rol</label>
                    <select
                      value={editRol}
                      onChange={(e) => setEditRol(Number(e.target.value))}
                      className="input-global"
                    >
                      <option value="">Seleccionar Rol</option>
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row-group">
                  <div className="form-group-global">
                    <label>Parqueadero</label>
                    <select
                      value={editParking}
                      onChange={(e) => setEditParking(Number(e.target.value))}
                      className="input-global"
                    >
                      <option value="">Seleccionar Parqueadero</option>
                      {parkings.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-buttons-global">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="btn-cancel-global"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-submit-global">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Eliminar */}
        {showDeleteModal && selectedUser && (
          <div className="modal-global">
            <div className="modal-content-global">
              <h2 className="modal-title-global">Eliminar Usuario</h2>
              <p>
                ¿Seguro que deseas eliminar a{" "}
                <b>
                  {selectedUser.nombre} {selectedUser.apellido}
                </b>
                ?
              </p>
              <div className="modal-buttons-global">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-cancel-global"
                >
                  Cancelar
                </button>
                <button onClick={handleDelete} className="btn-delete-global">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
