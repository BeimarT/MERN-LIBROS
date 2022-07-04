import { useContext } from "react";
import LibrosContext from "../context/LibrosProvider";

const useLibros = () => {
  return useContext(LibrosContext);
};

export default useLibros;
