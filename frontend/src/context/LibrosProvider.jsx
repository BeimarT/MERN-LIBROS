import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const LibrosContext = createContext();

const LibrosProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);
  const [libro, setLibro] = useState({});

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const url = "/libros";
        const { data } = await clienteAxios(url, config);
        setLibros(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerLibros();
  }, []);

  const guardarLibro = async (libro) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (libro.id) {
      try {
        const url = `/libros/${libro.id}`;
        const { data } = await clienteAxios.put(url, libro, config);
        const libroActualizado = libros.map((libro) =>
          libro._id === data._id ? data : libro
        );
        setLibros(libroActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const url = "/libros";
        const { data } = await clienteAxios.post(url, libro, config);

        const { createdAt, updatedAt, __v, ...libroGuardado } = data;

        setLibros([libroGuardado, ...libros]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setEdicion = (libro) => {
    setLibro(libro);
  };

  const eliminarLibro = async (id) => {
    const confirmar = confirm("¿Estas seguro?");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const url = `/libros/${id}`;

        await clienteAxios.delete(url, config);
        const libroEliminado = libros.filter((libro) => libro._id !== id);
        setLibros(libroEliminado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LibrosContext.Provider
      value={{
        libros,
        guardarLibro,
        libro,
        setEdicion,
        eliminarLibro,
      }}
    >
      {children}
    </LibrosContext.Provider>
  );
};

export { LibrosProvider };

export default LibrosContext;
