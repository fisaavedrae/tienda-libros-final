import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";
import "../assets/css/carro.css";

const SideCart = (props) => {
  const {
    productos,
    setProductos,
    carro,
    setCarro,
    total,
    setTotal,
    formatPrecio,
    prefijoImagen,
  } = useContext(MyContext);

  function quitarItemCarro(obj) {
    setCarro(carro.filter((item) => item.id_libro !== obj.id_libro));
    setTotal(Number(total) - Number(obj.qty) * Number(obj.precio));
  }
  function restarUnidadItemCarro(obj) {
    const indice = carro.findIndex((item) => item.id_libro === obj.id_libro);
    if (carro[indice].qty > 1) {
      setTotal(Number(total) - Number(obj.precio));

      carro[indice].qty = Number(obj.qty) - 1;
      //console.log("carro antes de eliminar", carro);
      setCarro([...carro]);
    } else {
      quitarItemCarro(obj);
    }
  }
  function sumarUnidadItemCarro(obj) {
    const indice = carro.findIndex((item) => item.id_libro === obj.id_libro);
    setTotal(Number(total) + Number(obj.precio));

    carro[indice].qty = Number(obj.qty) + 1;
    //console.log("carro antes de eliminar", carro);
    setCarro([...carro]);
  }
  const navigate = useNavigate();
  function handleCheckout() {
    navigate(`/CheckOut`);
  }
  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="container">
            <div className="container-fluid d-flex justify-content-between">
              <p className="items-carro">{carro.length} Libros</p>
              <div className="div">
                <p className="items-carro">Total</p>
                <p className="total-carro">{formatPrecio(total)}</p>
              </div>
            </div>
          </div>
          {carro.length !== 0 && (
            <div className="container">
              <button
                className="btn btn-pago text-uppercase w-100"
                data-bs-dismiss="offcanvas"
                onClick={() => handleCheckout()}
              >
                check out
              </button>
            </div>
          )}
          {carro.length == 0 && (
            <div className="container text-center">
              <h2 className="fs-5">Su carro está vacío</h2>
            </div>
          )}

          <div className="divider mt-3"></div>
          <div className="container-fluid d-flex flex-column gap-3 mt-3">
            {carro.map((libro, index) => (
              <div
                key={index}
                id="producto-carro"
                className="container-fluid d-flex justify-content-start "
              >
                <img
                  className="img-fluid w-25"
                  src={libro.urlimagen}
                  alt="microfono"
                />
                <div className="d-flex ms-2  w-75 flex-column justify-content-start align-items-start ">
                  <p className="titulo-libro">{libro.titulo}</p>
                  <p className="precio-libro">
                    {formatPrecio(Number(libro.qty) * Number(libro.precio))}
                  </p>
                  <p className="cant-libro d-flex align-items-center gap-2">
                    Cant:{" "}
                    <i
                      className="fa fa-minus"
                      onClick={() => restarUnidadItemCarro(libro)}
                    ></i>
                    {libro.qty}
                    <i
                      className="fa fa-plus"
                      onClick={() => sumarUnidadItemCarro(libro)}
                    ></i>
                  </p>
                </div>
                <div className="div  align-items-end w-505">
                  <i
                    className="fa fa-trash"
                    onClick={() => quitarItemCarro(libro)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

SideCart.propTypes = {};

export default SideCart;
