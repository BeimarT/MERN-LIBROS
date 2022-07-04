import useLibros from "../hooks/useLibros";

const Libro = ({ libro }) => {
  const { setEdicion, eliminarLibro } = useLibros();

  const { titulo, autor, genero, idioma, paginas, _id } = libro;

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-800 my-2">
        Título:
        <span className="font-normal normal-case text-black"> {titulo}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Autor:
        <span className="font-normal normal-case text-black"> {autor}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Género:
        <span className="font-normal normal-case text-black"> {genero}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Idioma:
        <span className="font-normal normal-case text-black"> {idioma}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Páginas:
        <span className="font-normal normal-case text-black"> {paginas}</span>
      </p>
      <div className="flex justify-between my-5">
        <button
          type="buttom"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase
         font-bold rounded-lg"
          onClick={() => setEdicion(libro)}
        >
          Editar
        </button>
        <button
          type="buttom"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase
         font-bold rounded-lg"
          onClick={() => eliminarLibro(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Libro;
