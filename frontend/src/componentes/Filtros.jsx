import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { MyContext } from "./context/MyContext.jsx";
import "../assets/css/filtros.css";
import Spinner from "./Spinner.jsx";
//import autores from "../assets/autores.js";
//import generos from "../assets/generos.js";
//import editoriales from "../assets/editoriales.js";

const Filtros = () => {
  const {
    productos,
    formatPrecio,
    filtros,
    setFiltros,
    ReadAPI,
    setLibrosFiltrados,
    limpiarFiltros,
  } = useContext(MyContext);

  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [editoriales, setEditoriales] = useState([]);

  const [isLoadingAutores, setIsLoadingAutores] = useState(false);
  const [isLoadingGeneros, setIsLoadingGeneros] = useState(false);
  const [isLoadingEditoriales, setIsLoadingEditoriales] = useState(false);

  useEffect(() => {
    cargarFiltros();
  }, []);
  async function cargarFiltros() {
    //console.log("filtros", filtros);
    try {
      setIsLoadingAutores(false);
      const response = await fetch("http://localhost:3000/autores");
      const data = await response.json();
      //console.log("readapi autores");
      setAutores(data);
      setIsLoadingAutores(true);
    } catch (error) {
      console.log(error);
    }
    try {
      setIsLoadingEditoriales(false);
      const response = await fetch("http://localhost:3000/editoriales");
      const data = await response.json();
      //console.log("readapi autores");
      setEditoriales(data);
      setIsLoadingEditoriales(true);
    } catch (error) {
      console.log(error);
    }
    try {
      setIsLoadingGeneros(false);
      const response = await fetch("http://localhost:3000/generos");
      const data = await response.json();
      //console.log("readapi autores");
      setGeneros(data);
      setIsLoadingGeneros(true);
    } catch (error) {
      console.log(error);
    }
  }
  const handleLimpiarFiltros = () => {
    limpiarFiltros();
  };
  const handleFiltroPrecio = (valor) => {
    //console.log("entre");
    setFiltros({ ...filtros, maxPrice: valor });
  };

  const handleFiltroGenero = (valor) => {
    //console.log("entre a filtrar generio");
    setFiltros({ ...filtros, id_genero: valor });
    //handleFiltrar();
  };

  const handleFiltroAutor = (valor) => {
    //console.log("entre");
    setFiltros({ ...filtros, id_autor: valor });
    handleFiltrar();
  };

  const handleFiltroEditorial = (valor) => {
    //console.log("entre");
    setFiltros({ ...filtros, id_editorial: valor });
    handleFiltrar();
  };

  const handleFiltrar = () => {
    // console.log("entre");
    //console.log("antes filtro:", productos);
    //ReadAPI();
    //const libros = filtrarLibros(productos);
    //console.log("despues filtro: ", productos);
    //setLibrosFiltrados(productos);
  };

  return (
    <>
      <div className="container mb-4">
        <h1>Filtro por precio</h1>
        <div className="div">
          <input
            type="range"
            min="0"
            max="100000"
            className="form-range"
            id="customRange1"
            value={filtros.maxPrice}
            onChange={(e) => {
              handleFiltroPrecio(e.target.value);
            }}
          />
          <div className="d-flex flex-row justify-content-between align-items-center">
            <span>Precio maximo: {formatPrecio(filtros.maxPrice)}</span>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-4 d-flex justify-content-center  gap-4">
        <button
          className="btn btn-filtros text-uppercase w-75"
          onClick={handleLimpiarFiltros}
        >
          Limpiar Filtros
        </button>
      </div>
      {/* filtros generos */}
      <div className="accordion accordion-flush" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <h1>Generos</h1>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {!isLoadingGeneros && <Spinner />}
              <ul className="list-group list-group-flush ">
                {generos.map((genero, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="div">
                      <Link
                        className="link-filtros"
                        onClick={() => handleFiltroGenero(genero.id_genero)}
                      >
                        {genero.genero}
                      </Link>
                    </div>
                    <div className="div">({genero.cantidad_libros})</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <h1>Autores</h1>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {!isLoadingAutores && <Spinner />}
              <ul className="list-group list-group-flush ">
                {autores.map((autor, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="div">
                      <Link
                        className="link-filtros"
                        onClick={() => handleFiltroAutor(autor.id_autor)}
                      >
                        {autor.nombre}
                      </Link>
                    </div>
                    <div className="div">({autor.cantidad_libros})</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <h1>Editoriales</h1>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {!isLoadingEditoriales && <Spinner />}
              <ul className="list-group list-group-flush ">
                {editoriales.map((editorial, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="div">
                      <Link
                        className="link-filtros"
                        onClick={() =>
                          handleFiltroEditorial(editorial.id_editorial)
                        }
                      >
                        {editorial.nombre}
                      </Link>
                    </div>
                    <div className="div">({editorial.cantidad_libros})</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Filtros.propTypes = {};

export default Filtros;
