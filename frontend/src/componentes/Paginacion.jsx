import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";
import PropTypes from "prop-types";
import "../assets/css/paginacion.css";

const Paginacion = ({ cantidadLibros }) => {
  const {
    filtros,

    setFiltros,
    ReadAPI,
  } = useContext(MyContext);

  const paginationNumbers = [];
  //console.log("cantidadLibros", cantidadLibros);
  for (let i = 1; i <= Math.ceil(cantidadLibros / filtros.limits); i++) {
    paginationNumbers.push(i);
  }

  const handlePagination = (pageNumber) => {
    setFiltros({ ...filtros, page: pageNumber });
    ReadAPI();
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="paginations gap-2">
            {paginationNumbers.map((number, index) => (
              <li key={index} className="page-items">
                <Link
                  className={
                    filtros.page == number
                      ? "page-link pagina-actual"
                      : "page-link"
                  }
                  onClick={() => handlePagination(number)}
                >
                  {number}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

Paginacion.propTypes = {
  cantidadLibros: PropTypes.number,
};

export default Paginacion;
