import React from "react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MyContext } from "../componentes/context/MyContext.jsx";
const Search = (props) => {
  const {
    productos,
    setProductos,
    carro,
    setCarro,
    total,
    setTotal,
    formatPrecio,
    prefijoImagen,
    buscador,
    setBuscador,
  } = useContext(MyContext);
  const handleChange = (e) => {
    enviarFormularioBusqueda(buscador, productos);
    console.log("render handleChange");
  };
  const enviarFormularioBusqueda = (busqueda, paises) => {
    //setDatos(datosBack)
    let textoBusqueda = "";
    const resultadoBusqueda = productos.filter(function (pais) {
      textoBusqueda = pais.titulo.toUpperCase();
      if (textoBusqueda.includes(busqueda.toUpperCase())) {
        return true;
      }
    }, busqueda);
    setProductos([...resultadoBusqueda]);
  };
  return (
    <>
      <div
        className="offcanvas offcanvas-top bg-black"
        tabIndex="-1"
        id="offcanvasSearch"
        aria-labelledby="offcanvasSearchLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSearchLabel"></h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i id="btn-close-search" className="fa fa-xmark "></i>
          </button>
        </div>
        <div className="offcanvas-body items-center align-items-center d-flex justify-content-center ">
          <div className="border-bottom w-50">
            <div className="input-group mb-3 ">
              <input
                type="text"
                id="inputSearch"
                placeholder="Buscar..."
                onKeyUp={handleChange}
                value={buscador}
                onChange={(e) => setBuscador(e.target.value)}
              />
              <span className="input-group-text">
                <i
                  id="icono-lupa"
                  className="fa fa-magnifying-glass "
                  data-bs-dismiss="offcanvas"
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Search.propTypes = {};

export default Search;
