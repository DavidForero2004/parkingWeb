const APIURL = process.env.NEXT_PUBLIC_API_URL;

type PropsLogin = {
  endpoint: string;
  email: string;
  password: string;
};

type PropsLogout = {
  endpoint: string;
};

export async function login({ endpoint, email, password }: PropsLogin) {
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

export async function logOut({ endpoint }: PropsLogout) {
  try {
    const token = localStorage.getItem("token");

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

    // 🔑 Limpieza de sesión
    localStorage.removeItem("token");
    sessionStorage.removeItem("data");

    return data;
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
}
