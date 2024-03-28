import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";

const DetalleOrden = ({ id_orden, datos }) => {
  const { formatPrecio } = useContext(MyContext);

  //console.log("datos", datos);

  return (
    <>
      <div
        className="modal fade"
        id={"exampleModal" + id_orden}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Detalle orden #{id_orden}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container  d-flex flex-column gap-3 mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-uppercase">
                        imagen
                      </th>
                      <th scope="col" className="text-uppercase w-50 ">
                        titulo
                      </th>
                      <th scope="col" className="text-uppercase w-25">
                        precio
                      </th>
                      <th
                        scope="col"
                        className="text-uppercase w-25 text-center"
                      >
                        cant
                      </th>
                      <th scope="col" className="text-uppercase text-nowrap">
                        total
                      </th>
                    </tr>
                  </thead>

                  {datos.map((libro, index) => (
                    <tbody key={index}>
                      {libro.id_orden === id_orden && (
                        <tr>
                          <th scope="row">
                            <img
                              className="img-fluid w-100"
                              src={libro.urlimagen}
                              alt="microfono"
                            />
                          </th>
                          <td>{libro.titulo}</td>
                          <td className="text-nowrap">
                            {formatPrecio(Number(libro.precio))}
                          </td>
                          <td className="text-center">{libro.cantidad}</td>
                          <td className="w-50 text-nowrap">
                            {formatPrecio(Number(libro.monto))}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DetalleOrden.propTypes = {
  id_orden: PropTypes.number,
  datos: PropTypes.array,
};

export default DetalleOrden;
