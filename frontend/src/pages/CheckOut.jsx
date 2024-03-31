import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";

import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
//import { URLBASE } from "../config/index.js";
const CheckOut = () => {
  const {
    carro,
    setCarro,
    total,
    setTotal,
    formatPrecio,
    usuario,

    setOrden,
  } = useContext(MyContext);
  const [envio, setEnvio] = useState(4500);
  const [totalOrden, setTotalOrden] = useState(total + envio);

  useEffect(() => {
    handleTipoEnvio();
  }, [envio]);
  const handleTipoEnvio = () => {
    //console.log("envio", envio);
    setTotalOrden(total + envio);
  };
  const navigate = useNavigate();
  function handlePago() {
    llamarAPIPago();
  }

  async function llamarAPIPago() {
    try {
      const token = window.sessionStorage.getItem("token");
      console.log("carro checkout: ", carro);
      //console.log("token checkout: ", token);

      const response = await fetch(
        import.meta.env.VITE_URLBASE +
          "/ordenes?total=" +
          totalOrden +
          "&envio=" +
          envio,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(carro),
        } //+ user
      );
      //console.log("response checkout: ", response);
      const data = await response.json();

      if (data.status !== "Bad Request") {
        //console.log("data ordenes", data);
        setOrden(data.id_orden);
        setCarro([]);
        setTotal(0);
        navigate("/pago");
      } else {
        console.log("mensaje de error: ", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <div className=" row mb-3">
        <div className="col-md-6 themed-grid-col py-4 px-5">
          <h1 className="text-uppercase ms-2">datos de envío</h1>
          <div className="container d-flex flex-column  gap-5">
            <div className="div d-flex gap-5">
              <div className="div d-flex flex-column">
                <h2 className="fs-6">Nombre </h2>
                <span className="fw-light">{usuario.nombre}</span>
              </div>
              <div className="div d-flex flex-column">
                <h2 className="fs-6">Email </h2>
                <span className="fw-light">{usuario.email}</span>
              </div>
            </div>
            <div className="div d-flex gap-5">
              <div className="div d-flex flex-column">
                <h2 className="fs-6">Dirección </h2>
                <span className="fw-light">{usuario.direccion}</span>
              </div>
              <div className="div d-flex flex-column">
                <h2 className="fs-6">Ciudad </h2>
                <span className="fw-light">{usuario.ciudad}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 themed-grid-col bg-light py-4 px-5">
          <h1 className="text-uppercase ms-2">su orden</h1>
          <div className="container">
            <div className="d-flex justify-content-between mb-3">
              <h2 className="fs-6">Libro</h2>
              <h2 className="fs-6">Total</h2>
            </div>
            {carro.map((producto) => (
              <div
                className="d-flex justify-content-between "
                key={producto.id}
              >
                <p className="fs-6 fw-ligh">
                  {producto.titulo + " x " + producto.qty}
                </p>
                <p className="fs-6 fw-light">
                  {formatPrecio(producto.precio * producto.qty)}
                </p>
              </div>
            ))}
            <div className="d-flex justify-content-between mb-3 ">
              <h2 className="fs-6">Sub total</h2>
              <h2 className="fs-6">{formatPrecio(total)}</h2>
            </div>
            <div className="d-flex justify-content-between mb-3 ">
              <h2 className="fs-6">Envío</h2>
              <h2 className="fs-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipo-envio"
                    id="envio-normal"
                    checked
                    onClick={() => setEnvio(4500)}
                  />
                  <label className="form-check-label" htmlFor="envio-normal">
                    envío normal: $4.500
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipo-envio"
                    id="envio-express"
                    onClick={() => setEnvio(9990)}
                  />
                  <label className="form-check-label" htmlFor="envio-express">
                    envío express: $9.990
                  </label>
                </div>
              </h2>
            </div>
            <div className="divider"></div>
            <div className="d-flex justify-content-between py-4 ">
              <h2 className="fs-5">Total orden</h2>
              <h2 className="fs-5">{formatPrecio(totalOrden)}</h2>
            </div>
            <div className="d-flex justify-content-between py-4 px-5">
              <button
                className="btn btn-pago text-uppercase w-100"
                onClick={handlePago}
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

CheckOut.propTypes = {};

export default CheckOut;
