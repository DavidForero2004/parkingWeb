"use client";

import { useEffect, useState } from "react";
import { createUser, getParking, getRols } from "@/services/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook/useToast";
import { PropsRol } from "@/model/rol";
import { PropsParking } from "@/model/parking";

export default function CreateUserPage() {
  // Datos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rol_id, setRolId] = useState<number>(0);
  const [roles, setRoles] = useState<PropsRol[]>([]);
  const [parking_id, setParkingId] = useState<number>(0);
  const [parkings, setParkings] = useState<PropsParking[]>([]);

  // Control de visibilidad de selects
  const [showRoles, setShowRoles] = useState(false);
  const [showParkings, setShowParkings] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true; // Previene setState si el componente se desmonta

    const sessionData = sessionStorage.getItem("data");
    if (!sessionData) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const parsed = JSON.parse(sessionData);

    const loadData = async () => {
      try {
        // SUPER ADMIN
        if (parsed.r === 1) {
          if (!isMounted) return;
          setShowRoles(true);
          setShowParkings(true);

          const rolesData = await getRols({ endpoint: "/rol" });
          if (rolesData && isMounted) setRoles(rolesData);

          const parkingData = await getParking({ endpoint: "/parking" });
          if (parkingData && isMounted) setParkings(parkingData);

        // ADMIN
        } else if (parsed.r === 2) {
          if (!isMounted) return;
          setShowRoles(true);
          setShowParkings(false);
          setParkingId(parsed.p); // Parking fijo desde session

          const rolesData = await getRols({ endpoint: "/rol" });
          if (rolesData && isMounted) {
            // Filtra rol 1 (super admin)
            setRoles(rolesData.filter((rol: PropsRol) => rol.id !== 1));
          }

        // USUARIOS NORMALES
        } else {
          if (!isMounted) return;
          setShowRoles(false);
          setShowParkings(false);
        }
      } catch (err) {
        console.error(err);
        showToast("Error al cargar datos", "error");
      }
    };

    loadData();

    return () => {
      isMounted = false; // Limpiar flag al desmontar
    };
  }, []);

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createUser({
      endpoint: "/user/new",
      nombre,
      apellido,
      cedula,
      telefono,
      email,
      password,
      rol_id,
      parking_id,
    });

    setLoading(false);

    if (result) {
      showToast("Usuario creado exitosamente", "success");
      router.push("/dashboard/user");
    } else {
      showToast("Error al crear el usuario", "error");
    }
  };

  return (
    <div className="page-create-container">
      <div className="form-container-global">
        <h1 className="modal-title-global">Crear Usuario</h1>

        <form onSubmit={handleSubmit}>
          {/* Datos básicos */}
          <div className="row-group">
            <div className="form-group-global">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: David"
                required
                className="input-global"
              />
            </div>
            <div className="form-group-global">
              <label>Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ej: Forero"
                required
                className="input-global"
              />
            </div>
          </div>

          <div className="row-group">
            <div className="form-group-global">
              <label>Cédula</label>
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ej: 102522180"
                required
                className="input-global"
              />
            </div>
            <div className="form-group-global">
              <label>Teléfono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej: 321654981"
                required
                className="input-global"
              />
            </div>
          </div>

          <div className="row-group">
            <div className="form-group-global">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="david@example.com"
                required
                className="input-global"
              />
            </div>
            <div className="form-group-global">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="input-global"
              />
            </div>
          </div>

          {/* Select de roles */}
          {showRoles && (
            <div className="row-group">
              <div className="form-group-global">
                <label>Rol</label>
                <select
                  value={rol_id}
                  onChange={(e) => setRolId(Number(e.target.value))}
                  required
                  className="input-global"
                >
                  <option value="">Seleccione un rol</option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Select de parqueaderos */}
          {showParkings && (
            <div className="row-group">
              <div className="form-group-global">
                <label>Parqueadero</label>
                <select
                  value={parking_id}
                  onChange={(e) => setParkingId(Number(e.target.value))}
                  required
                  className="input-global"
                >
                  <option value="">Seleccione un parqueadero</option>
                  {parkings.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="form-buttons-global">
            <button
              type="button"
              onClick={() => router.push("/dashboard/user")}
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
