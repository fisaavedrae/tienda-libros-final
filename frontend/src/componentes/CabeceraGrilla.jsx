import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";

const CabeceraGrilla = ({ cantidadLibros }) => {
  const [orden, setOrden] = useState("");
  const {
    productos,
    setProductos,
    filtros,
    setFiltros,
    ReadAPI,
    librosFiltrados,
    setLibrosFiltrados,
    setIsLoadingGrilla,
  } = useContext(MyContext);
  const handleClick = (valor) => {
    //console.log("entre");
    //console.log("valor", valor);
    setIsLoadingGrilla(false);
    setFiltros({ ...filtros, order_by: valor });
    //ReadAPI();
    setIsLoadingGrilla(true);
  };
  return (
    <div
      id="cabecera-grilla"
      className="container d-flex flex-row justify-content-between align-items-center border-bottom border-top mb-3 pt-3 pb-3"
    >
      <p>Mostrando {cantidadLibros} Libros</p>
      <div className="d-flex flex-row justify-content-between">
        <select
          className="form-select form-select-sm"
          aria-label="Small select example"
          onChange={(e) => handleClick(e.target.value)}
        >
          <option value="titulo_ASC" defaultValue={true}>
            Ordenar por
          </option>
          <option value="precio_ASC">precio menor</option>
          <option value="precio_DESC">precio mayor</option>
          <option value="titulo_ASC">Titulo a-z</option>
          <option value="titulo_DESC">Titulo z-a</option>
        </select>
      </div>
    </div>
  );
};

CabeceraGrilla.propTypes = {
  cantidadLibros: PropTypes.number,
};

export default CabeceraGrilla;
