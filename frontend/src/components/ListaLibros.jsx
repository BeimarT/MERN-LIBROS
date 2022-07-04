import useLibros from "../hooks/useLibros";
import Libro from "./Libro";

const ListaLibros = () => {
  const { libros } = useLibros();
  return (
    <>
      {libros.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Lista de Libros</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{" "}
            <span className="text-indigo-600 font-bold">Libros</span>
          </p>
          {libros.map((libro) => (
            <Libro key={libro._id} libro={libro} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Libros</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Empieza agregando tus{" "}
            <span className="text-indigo-600 font-bold">Libros</span>
          </p>
        </>
      )}
    </>
  );
};

export default ListaLibros;
