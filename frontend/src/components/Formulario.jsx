const Formulario = () => {
  return (
    <>
      <p className="text-lg text-center mb-10">
        Añade y administra tus{" "}
        <span className="text-indigo-600 font-bold">Libros</span>
      </p>
      <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
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
          />
        </div>
        <div className="mb-5">
          <label htmlFor="paginas" className="text-gray-700 uppercase font-bold">
            Páginas del Libro
          </label>
          <input
            id="paginas"
            type="number"
            placeholder="Páginas del libro"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
    
          value="Añadir Libro"
        />
      </form>
    </>
  );
};

export default Formulario;
