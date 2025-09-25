import {PropsUser} from "@/model/user"

import {PropsRol} from "@/model/rol"

const APIURL = process.env.NEXT_PUBLIC_API_URL;


export async function login(props: PropsUser) {
  const { endpoint, email, password } = props;

  try {
    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error(`Error en POST: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logOut(props: PropsUser) {
  const { endpoint } = props;
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      throw new Error("No hay token guardado");
    }

    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error en POST: ${res.status}`);
    }

    const data = await res.json();

    //Limpieza de sesión
    localStorage.removeItem("token");
    sessionStorage.removeItem("data");

    return data;
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
}


//** ROLES **/
// MOSTRAR ROLES
export async function getRols(props: PropsRol) {
  const { endpoint } = props;

    const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en getRols:", error);
    return null;
  }
}

// ACTUALIZAR ROL
export async function updateRol(props: PropsRol) {
  const { endpoint, id, nombre } = props;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${APIURL}${endpoint}/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ nombre }),
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en updateRol:", error);
    return null;
  }
}

// ELIMINAR ROL
export async function deleteRol(props: PropsRol) {
  const { endpoint, id } = props;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${APIURL}${endpoint}/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en deleteRol:", error);
    return null;
  }
}

// CREAR ROL
export async function createRol(props: PropsRol) {
  const { endpoint, nombre } = props;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${APIURL}${endpoint}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ roles: [{ nombre }] }),
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error en createRol:", error);
    return null;
  }
}