import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const PasswordOlvidada = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        mensaje: "El email es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post("/usuarios/password-olvidada", {
        email,
      });
      setAlerta({
        mensaje: data.msg,
      });
    } catch (error) {
      setAlerta({
        mensaje: error.response.data.msg,
        error: true,
      });
    }
  };

  const { mensaje } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu contraseña
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {mensaje && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar Email"
            className="bg-indigo-700 w-full py-3 px-10 font-bold rounded-xl text-white uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-black font-bold">Inicia Sesión</span>
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes cuenta?{" "}
            <span className="text-black font-bold">Regístrate</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default PasswordOlvidada;
