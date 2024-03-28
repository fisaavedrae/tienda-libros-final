import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import "../assets/css/hover.css";
import { MyContext } from "./context/MyContext.jsx";
import { useNavigate } from "react-router-dom";
import Paginacion from "./Paginacion.jsx";
import Filtros from "./Filtros.jsx";
import CabeceraGrilla from "./CabeceraGrilla.jsx";
import Spinner from "./Spinner.jsx";

const GrillaLibros = () => {
  const {
    productos,
    agregarCarrito,
    formatPrecio,
    ReadAPI,
    isLoadingGrilla,
    setIsLoadingGrilla,
    mensaje,
  } = useContext(MyContext);

  //const [cantidadLibros, setCantidadLibros] = useState(0);
  const navigate = useNavigate();
  const irAProducto = (id) => {
    navigate(`/Libro/${id}`);
  };
  useEffect(() => {
    cargarDatos();
  }, []);
  //console.log("productos: ", productos);
  const cargarDatos = () => {
    setIsLoadingGrilla(false);
    ReadAPI();
    setIsLoadingGrilla(true);
  };
  let cantidadLibros = 0;
  if (productos[0]?.cantidadlibros) {
    cantidadLibros = productos[0].cantidadlibros;
  }

  return (
    <>
      <div id="contenedor-libros" className="container ">
        <div id="filtros" className="container">
          <Filtros />
        </div>
        <div id="libros">
          <div className="GrillaProductos">
            <CabeceraGrilla cantidadLibros={productos.length} />
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {!isLoadingGrilla && <Spinner />}
              {cantidadLibros === 0 && (
                <div className="container text-center items-center mt-5 mb-5">
                  <div className="alert alert-warning">
                    No hay coincidencia de libros
                  </div>
                </div>
              )}
              {cantidadLibros !== 0 &&
                productos.map((product, index) => (
                  <div key={index} className="col">
                    <div className="card">
                      <div className="hovereffect">
                        <img
                          src={product.urlimagen}
                          className="card-img-top"
                          alt={product.titulo}
                        />
                        <div className="overlay d-flex flex-column justify-content-end align-items-center">
                          <div className="d-flex flex-row justify-content-between gap-3 fs-3 ">
                            <i
                              className="fa-solid fa-cart-shopping mb-4"
                              onClick={() => agregarCarrito(1, product)}
                            />
                            <i
                              className="fa-solid fa-magnifying-glass-plus"
                              onClick={() => irAProducto(product.id_libro)}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.titulo}</h5>

                        <p className="card-text">
                          {formatPrecio(product.precio)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {mensaje === "" && <Paginacion cantidadLibros={cantidadLibros} />}
        </div>
      </div>
    </>
  );
};

GrillaLibros.propTypes = {};

export default GrillaLibros;
