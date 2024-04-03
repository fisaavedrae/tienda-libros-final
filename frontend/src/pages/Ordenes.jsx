import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";
//import jsonOrdenes from "../assets/ordenes.json";
import "../assets/css/carro.css";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import DetalleOrden from "../componentes/DetalleOrden.jsx";
//import { URLBASE } from "../config/index.js";

const Ordenes = (props) => {
  const { formatPrecio, mensaje, setMensaje } = useContext(MyContext);
  const [ordenes, setOrdenes] = useState([]);
  const [ordenes2, setOrdenes2] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getDetalleOrden(1);
    getOrdenes();
    //console.log("entre al useefect");
  }, []);
  async function getOrdenes() {
    setMensaje({ ...mensaje, open: false });
    try {
      const token = window.sessionStorage.getItem("token");
      //console.log("token", token);
      if (!token) {
        //console.log("no hay token");
        navigate("/home");
      }
      //console.log("token micuenta: ", token);
      const response = await fetch(
        import.meta.env.VITE_URLBASE + "/ordenes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        } //+ user
      );
      const data = await response.json();
      //console.log(data);
      if (data.status !== "Bad Request") {
        setOrdenes(data);
        //ordenarJson(data);
      } else {
        setMensaje({
          mensaje: data.message,
          tipo: "alert alert-danger",
          open: true,
        });
        //console.log(mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getDetalleOrden(id_orden) {
    setMensaje({ ...mensaje, open: false });
    try {
      const token = window.sessionStorage.getItem("token");
      //console.log("token", token);
      if (!token) {
        console.log("no hay token");
        navigate("/home");
      }
      //console.log("token micuenta: ", token);
      console.log("id_orden", id_orden);
      const response = await fetch(
        import.meta.env.VITE_URLBASE + "/ordenes/" + id_orden,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        } //+ user
      );

      //console.log("voy a llamar a api de detalle");
      const data = await response.json();

      if (data.status !== "Bad Request") {
        //console.log("data", data);
        setOrdenes2(data);
        //console.log("ordenes2", ordenes2);
        //console.log("ordenes", ordenes);
      } else {
        setMensaje({
          mensaje: data.message,
          tipo: "alert alert-danger",
          open: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <div className=" row mb-3">
        <div className="col-md-3 themed-grid-col py-4 px-5">
          <h1 className="text-uppercase">Navegación</h1>

          <div className="d-flex flex-column">
            <Link to="/MiCuenta">Mi Cuenta</Link>
            <Link to="/Ordenes">Mis Ordenes</Link>
          </div>
        </div>
        <div className="col-md-9 themed-grid-col py-4 px-5">
          <h1 className="text-uppercase ms-2">Mis Ordenes</h1>
          {mensaje.open && (
            <div className={mensaje.tipo} role="alert">
              {mensaje.mensaje}
            </div>
          )}
          <table className="table-sm">
            <thead>
              <tr>
                <th scope="col" className="text-uppercase fs-6 fw-medium">
                  Orden
                </th>
                <th scope="col" className="text-uppercase  fs-6 fw-medium ">
                  fecha de compra
                </th>

                <th
                  scope="col"
                  className="text-uppercase text-nowrap fs-6 fw-medium"
                >
                  total
                </th>
                <th
                  scope="col"
                  className="text-uppercase text-nowrap fs-6 fw-medium"
                >
                  ver
                </th>
              </tr>
            </thead>
            {ordenes.map((orden, index) => (
              <tbody key={index}>
                <tr className="border-bottom">
                  <td scope="row" className="fs-6 fw-light">
                    {orden.id_orden}
                  </td>
                  <td className="fs-6 fw-light">{orden.fecha_orden}</td>
                  <td className="text-center text-nowrap fs-6 fw-light">
                    {formatPrecio(Number(orden.monto))}
                  </td>
                  <td className="fs-6 fw-light text-center">
                    <i
                      className="fa-solid fa-eye icono-ver"
                      data-bs-toggle="modal"
                      data-bs-target={"#exampleModal" + orden.id_orden}
                    ></i>
                    {
                      <DetalleOrden
                        id_orden={orden.id_orden}
                        datos={ordenes2}
                      />
                    }
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

Ordenes.propTypes = {};

export default Ordenes;
