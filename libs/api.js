import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import config from "@/config";

// use this to interact with our own API (/app/api folder) from the front-end side
// See https://shipfa.st/docs/tutorials/api-call
const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    let message = "";

    if (error.response?.status === 401) {
      // User not auth, ask to re login
      toast.error("Please login");
      // automatically redirect to /dashboard page after login
      return signIn(undefined, { callbackUrl: config.auth.callbackUrl });
    } else if (error.response?.status === 403) {
      // User not authorized, must subscribe/purchase/pick a plan
      message = "Pick a plan to use this feature";
    } else {
      message =
        error?.response?.data?.error || error.message || error.toString();
    }

    error.message =
      typeof message === "string" ? message : JSON.stringify(message);

    console.error(error.message);

    // Automatically display errors to the user
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export async function fetchNoticias() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/entradas?accion=getLatest`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Error al obtener las noticias");
  }
  return response.json();
}

export async function fetchCarteras() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/carteras`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Error al obtener las carteras");
  }
  return response.json();
}

export async function fetchResearchs() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/researchs`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los researchs");
  }
  return response.json();
}

export async function fetchWebinars() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/webinar`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Error al obtener los webinars");
  }
  return response.json();
}

export async function fetchSuperInvestorBySlug(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/superinvestors?slug=${slug}&accion=getBySlug`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching super investor:", error);
    return null;
  }
}

export async function fetchVideos(categoria) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/videos?categoria=${categoria}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los videos");
    }
    return response.json();
  } catch (error) {
    console.error("Error al obtener los videos:", error);
    return [];
  }
}
export async function fetchCursoBySlug(slug) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/cursos?accion=getBySlug&slug=${slug}`
  );
  const data = await response.json();
  return data;
}

export async function fetchCursos() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cursos`);
  if (!response.ok) {
    throw new Error("Error al obtener los cursos");
  }
  return response.json();
}

export async function checkPurchase(priceId) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/check-data`, {
      method: "POST",
      body: JSON.stringify({ priceId }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });

    return response.data;
  } catch (error) {
    console.error("Error al verificar la compra:", error);
    return { hasPurchased: false };
  }
}

export async function fetchAPI(path, options = {}) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api${path}`, {
    ...options,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Error al obtener datos de ${path}`);
  }
  return response.json();
}

export async function fetchCarteraAcciones() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/cartera-acciones`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Error al obtener las carteras de acciones");
  }
  return response.json();
}

export async function fetchTablasAnteriores() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/tablas-anteriores`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Error al obtener las tablas anteriores");
  }
  return response.json();
}
