import { useState, useEffect } from "react";
import useLibros from "../hooks/useLibros";
import Alerta from "./Alerta";

const Formulario = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [idioma, setIdioma] = useState("");
  const [paginas, setPaginas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarLibro, libro } = useLibros();

  useEffect(() => {
    if (libro?.titulo) {
      setTitulo(libro.titulo);
      setAutor(libro.autor);
      setGenero(libro.genero);
      setIdioma(libro.idioma);
      setPaginas(libro.paginas);
      setId(libro._id);
    }
  }, [libro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar form
    if ([titulo, autor, genero, idioma, paginas].includes("")) {
      setAlerta({
        mensaje: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    setAlerta({});
    guardarLibro({ titulo, autor, genero, idioma, paginas, id });

    setAlerta({
      mensaje: "Guardado Correctamente",
    });
    setTimeout(() => {
      setAlerta({});
    }, 2000);

    setTitulo("");
    setAutor("");
    setGenero("");
    setIdioma("");
    setPaginas("");
    setId("");
  };

  const { mensaje } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Libros
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade y gestiona tus{" "}
        <span className="text-indigo-600 font-bold">Libros</span>
      </p>
      {mensaje && <Alerta alerta={alerta} />}
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="titulo"
            className="text-gray-700  uppercase font-bold"
          >
            Título del Libro
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Título del libro"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="autor" className="text-gray-700  uppercase font-bold">
            Autor del Libro
          </label>
          <input
            id="autor"
            type="text"
            placeholder="Autor del libro"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="genero" className="text-gray-700 uppercase font-bold">
            Género del Libro
          </label>
          <input
            id="genero"
            type="text"
            placeholder="Género del libro"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="idioma" className="text-gray-700 uppercase font-bold">
            Idioma del Libro
          </label>
          <input
            id="idioma"
            type="text"
            placeholder="Idioma del libro"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="paginas"
            className="text-gray-700 uppercase font-bold"
          >
            Páginas del Libro
          </label>
          <input
            id="paginas"
            type="number"
            placeholder="Páginas del libro"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={id ? "Guardar Cambios" : "Añadir Libro"}
        />
      </form>
    </>
  );
};

export default Formulario;
