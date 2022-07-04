import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const PasswordNueva = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordNueva, setPassordNueva] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/password-olvidada/${token}`);
        setAlerta({
          mensaje: "Cambia la contraseña",
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          mensaje: "Error en el enlace ",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password < 6) {
      setAlerta({
        mensaje: "La contraseña debe ser mínimo de 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `/usuarios/password-olvidada/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        mensaje: data.msg,
      });
      setPassordNueva(true);
    } catch (error) {
      setAlerta({
        mensaje: error.response.data.msg,
      });
    }
  };

  const { mensaje } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu contraseña y no pierdas acceso a{" "}
          <span className="text-black">tus Libros</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {mensaje && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Nueva Contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Cambiar contraseña"
                className="bg-indigo-700 w-full py-3 px-10 font-bold rounded-xl text-white uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
          </>
        )}

        {passwordNueva && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            <span className="text-black font-bold">Iniciar Sesión</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default PasswordNueva;
