import { PropsUser } from "@/model/user";
import { PropsRol } from "@/model/rol";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

// ------------------- AUTH -------------------
export async function login(props: PropsUser) {
  const { endpoint, email, password } = props;
  try {
    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error(`Error en login: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function logOut(props: PropsUser) {
  const { endpoint } = props;
  const token = localStorage.getItem("token");

  try {
    if (!token) throw new Error("No hay token guardado");

    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Error en logout: ${res.status}`);
    const data = await res.json();

    // limpiar sesión
    localStorage.removeItem("token");
    sessionStorage.removeItem("data");

    return data;
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
}

// ------------------- ROLES -------------------
export async function getRols(props: PropsRol) {
  const { endpoint } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Error en getRols: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en getRols:", error);
    return null;
  }
}

export async function createRol(props: PropsRol) {
  const { endpoint, nombre } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ roles: [{ nombre }] }),
    });

    if (!res.ok) throw new Error(`Error en createRol: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en createRol:", error);
    return null;
  }
}

export async function updateRol(props: PropsRol) {
  const { endpoint, id, nombre } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre }),
    });

    if (!res.ok) throw new Error(`Error en updateRol: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en updateRol:", error);
    return null;
  }
}

export async function deleteRol(props: PropsRol) {
  const { endpoint, id } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Error en deleteRol: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en deleteRol:", error);
    return null;
  }
}

// ------------------- USUARIOS -------------------
export async function getUsers(props: PropsUser) {
  const { endpoint } = props;
  const token = localStorage.getItem("token");
  const parking_id = localStorage.getItem("park");

  try {
    const res = await fetch(`${APIURL}${endpoint}?parking_id=${parking_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Error en getUsers: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en getUsers:", error);
    return null;
  }
}
export async function createUser(props: PropsUser) {
  const { endpoint, nombre, apellido, cedula, telefono, email, password, rol_id, parking_id } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre, apellido, cedula, telefono, email, password, rol_id, parking_id }),
    });

    if (!res.ok) throw new Error(`Error en createUser: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en createUser:", error);
    return null;
  }
}

export async function updateUser(props: PropsUser) {
  const { endpoint, id, nombre, apellido, email, telefono, cedula, rol_id, parking_id, password } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre, apellido, email, telefono, cedula, rol_id, parking_id, password }),
    });

    if (!res.ok) throw new Error(`Error en updateUser: ${res.status}`);
    return await res.json();
  } catch (error) {
    
    console.error("Error en updateUser:", error);
    return null;
  }
}

export async function deleteUser(props: PropsUser) {
  const { endpoint, id } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Error en deleteUser: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en deleteUser:", error);
    return null;
  }
}

// ------------------- PARQUEADEROS -------------------
export async function getParking(props: { endpoint: string }) {
  const { endpoint } = props;
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Error en getParking: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en getParking:", error);
    return null;
  }
}
