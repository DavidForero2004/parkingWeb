"use client"
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "@/styles/table.css";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

export default function TableUsuarios() {
  const initialUsuarios: Usuario[] = [
    { id: 1, nombre: "Juan Pérez", correo: "juan@mail.com", rol: "Administrador" },
    { id: 2, nombre: "María Gómez", correo: "maria@mail.com", rol: "Usuario" },
    { id: 3, nombre: "Carlos Ruiz", correo: "carlos@mail.com", rol: "Usuario" },
    { id: 4, nombre: "Laura Díaz", correo: "laura@mail.com", rol: "Super Administrador" },
    { id: 5, nombre: "Pedro López", correo: "pedro@mail.com", rol: "Usuario" },
    { id: 6, nombre: "Ana Torres", correo: "ana@mail.com", rol: "Administrador" },
  ];

  const [usuarios, setUsuarios] = useState<Usuario[]>(initialUsuarios);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(usuarios.length / pageSize);

  // Para editar
  const [editNombre, setEditNombre] = useState("");
  const [editCorreo, setEditCorreo] = useState("");
  const [editRol, setEditRol] = useState("");

  const handleDelete = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setModalOpenDelete(true);
  };

  const confirmDelete = () => {
    setUsuarios(usuarios.filter(u => u.id !== selectedUsuario?.id));
    setModalOpenDelete(false);
    setSelectedUsuario(null);
    if (currentPage > Math.ceil((usuarios.length - 1) / pageSize)) {
      setCurrentPage(prev => Math.max(prev - 1, 1));
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setEditNombre(usuario.nombre);
    setEditCorreo(usuario.correo);
    setEditRol(usuario.rol);
    setModalOpenEdit(true);
  };

  const confirmEdit = () => {
    if (selectedUsuario) {
      setUsuarios(prev => prev.map(u =>
        u.id === selectedUsuario.id
          ? { ...u, nombre: editNombre, correo: editCorreo, rol: editRol }
          : u
      ));
    }
    setModalOpenEdit(false);
    setSelectedUsuario(null);
  };

  const paginatedUsuarios = usuarios.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <input className="input-search" placeholder="Buscar usuario..." />

      <table className="table-global">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsuarios.map((usuario, i) => (
            <tr key={usuario.id}>
              <td>{(currentPage - 1) * pageSize + i + 1}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol}</td>
              <td>
                <button className="btn-action btn-edit" onClick={() => handleEdit(usuario)}><FaEdit /></button>
                <button className="btn-action btn-delete" onClick={() => handleDelete(usuario)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      {/* Modal Eliminar */}
      {modalOpenDelete && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">Eliminar Usuario</div>
            <div>¿Seguro que quieres eliminar <b>{selectedUsuario?.nombre}</b>?</div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setModalOpenDelete(false)}>Cancelar</button>
              <button className="btn-delete" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {modalOpenEdit && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">Editar Usuario</div>
            <div className="modal-body">
              <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)} placeholder="Nombre" />
              <input type="email" value={editCorreo} onChange={e => setEditCorreo(e.target.value)} placeholder="Correo" />
              <input type="text" value={editRol} onChange={e => setEditRol(e.target.value)} placeholder="Rol" />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setModalOpenEdit(false)}>Cancelar</button>
              <button className="btn-edit" onClick={confirmEdit}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
