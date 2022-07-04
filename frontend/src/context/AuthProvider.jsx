import { useState, useEffect, createContext } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const url = "/usuarios/perfil";
        const { data } = await clienteAxios(url, config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        //Evitamos dejar información en consola
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (usuario) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `/usuarios/perfil/${usuario._id}`;
      const { data } = await clienteAxios.put(url, usuario, config);
      return {
        mensaje: "Guardado Correctamente",
      };
    } catch (error) {
      return {
        mensaje: error.response.data.msg,
        error: true,
      };
    }
  };
  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = "/usuarios/actualizar-password";
      const { data } = await clienteAxios.put(url, datos, config);
      return {
        mensaje: data.msg,
      };
    } catch (error) {
      console.log(error);
      return {
        mensaje: error.response.data.msg,
        error: true,
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
