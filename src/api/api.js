const API_URL = "http://192.168.1.121:5000"; 

// Función para registrar un usuario
export const registrarUsuario = async (nombre,apellido,usuario,password) => {
  try {
    const response = await fetch(`${API_URL}/users/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre,apellido,usuario,password}), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar el usuario.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la API:", error.message);
    throw error; 
  }
};

// Función para iniciar sesión
export const iniciarSesion = async (usuario, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la API (login):", error.message);
    throw error;
  }

};

// Función para ObtenerPelicula
export const obtenerPeliculas = async () => {
  try {
    const response = await fetch(`${API_URL}/peliculas`);
    if (!response.ok) {
      throw new Error("Error al obtener destinos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Función para ObtenerPeliculaPoID
export const obtenerPeliculasPorID = async (id) => {
  try {
    const response = await fetch(`${API_URL}/peliculas/${id}`); 
    if (!response.ok) {
      throw new Error(`Error al obtener la película con ID ${id}`);
    }
    return await response.json(); 
  } catch (error) {
    console.error("Error en la función obtenerPeliculasPorID:", error);
    throw error; 
  }
};


