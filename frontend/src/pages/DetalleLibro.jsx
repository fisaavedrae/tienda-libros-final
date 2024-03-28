import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";

import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import "../assets/css/form.css";

const DetalleLibro = () => {
  const { productos, formatPrecio, agregarCarrito } = useContext(MyContext);
  const { id } = useParams();
  const [cant, setCant] = useState(1);
  const [error, setError] = useState(false);

  const libro = productos.find(
    (producto) => Number(producto.id_libro) === Number(id)
  );
  const handleCarrito = (libro) => {
    console.log("cant", cant);
    if (cant < 1) {
      setError(true);
    } else {
      setError(false);
      agregarCarrito(cant, libro);
    }
  };

  return (
    <>
      <Header />
      <Link to={"/"}>
        <i className="fa fa-arrow-left ms-5 mb-4"></i> Volver
      </Link>

      <div className="container d-sm-flex gap-5">
        <div className="div">
          <img className="img-fluid" src={libro.urlimagen} alt="" />
        </div>
        <div className="div">
          <div className=" mt-4 fs-4 fw-bold">{libro.titulo}</div>
          <div className="mt-4 fs-4 fw-bold">{formatPrecio(libro.precio)}</div>
          <div className="divider mt-4 mb-5"></div>
          <d className="container-fluid pt-4">{libro.resena}</d>
          <div className="container-fluid  d-sm-flex mt-4">
            <div className=" fw-bold pe-2">Autor: </div>
            <div className="div pe-5">{libro.autor}</div>
            <div className=" fw-bold pe-2">Editorial: </div>
            <div className="div">{libro.editorial}</div>
          </div>
          <div className="d-flex gap-2 align-items-center mt-5">
            <span>Cant</span>
            <input
              type="number"
              id="inputCant"
              className=""
              value={cant}
              onChange={(e) => setCant(e.target.value)}
            />
            <button
              onClick={() => {
                handleCarrito(libro);
              }}
              className="btn btn-filtros"
            >
              Agregar al carro
            </button>
          </div>
          {error && (
            <div className="alert alert-danger w-50 mt-3" role="alert">
              La cantidad debe ser mayor o igual a cero.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

DetalleLibro.propTypes = {};

export default DetalleLibro;
