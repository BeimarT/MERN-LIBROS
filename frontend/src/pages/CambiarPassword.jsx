import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    passwordActual: "",
    passwordNuevo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        mensaje: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password.passwordNuevo.length < 6) {
      setAlerta({
        mensaje: "La contraseña debe tener mínimo de 6 caracteres",
        error: true,
      });
      return;
    }
    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
  };
  const { mensaje } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-lack text-3xl text-center mt-10">
        Cambiar contraseña
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">Contraseña Aquí</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {mensaje && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Contraseña Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="passwordActual"
                placeholder="Escribe tu contraseña actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Contraseña Nueva
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="passwordNuevo"
                placeholder="Escribe tu contraseña nueva"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Actualizar Contraseña"
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-lg"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
