import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
//import { URLBASE } from "../config/index.js";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
  nombre: "",
  email: "",
  password: "",
  direccion: "",
  ciudad: "",
};
const Registro = (props) => {
  const {
    productos,
    agregarCarrito,
    formatPrecio,
    ReadAPI,
    isLoadingGrilla,
    setIsLoadingGrilla,
    mensaje,
    setMensaje,
  } = useContext(MyContext);
  const navigate = useNavigate();
  /*
  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      navigate("/Micuenta");
    }
  }, []);
*/
  const [user, setUser] = useState(initialForm);
  const [mensajeRegistro, setMensajeRegistro] = useState({
    mensaje: "",
    tipo: "",
    open: false,
  });

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    ("use strict");

    setMensajeRegistro({ mensaje: "", tipo: "", open: false });
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            console.log(form);
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
    if (
      !user.nombre.trim() ||
      !user.email.trim() ||
      !user.password.trim() ||
      !user.direccion.trim() ||
      !user.ciudad.trim()
    ) {
      setMensajeRegistro({
        mensaje: "Todos los campos son obligatorios.",
        tipo: "alert alert-warning",
        open: true,
      });
      return window.alert("Todos los campos son obligatorias.");
    }

    if (!emailRegex.test(user.email)) {
      setMensajeRegistro({
        mensaje: "El formato del email no es correcto.",
        tipo: "alert alert-warning",
        open: true,
      });
      return window.alert("El formato del email no es correcto!");
    }

    /** llamar a la api para crear usuario* */
    llamarAPICreacionUsuario();
  };
  async function llamarAPICreacionUsuario() {
    try {
      const response = await fetch(
        import.meta.env.VITE_URLBASE + "/registro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        } //+ user
      );
      const data = await response.json();
      //console.log("order:", filtros.order_by);
      //console.log(data);
      if (data.status !== "Bad Request") {
        //console.log("data", data);
        setMensajeRegistro({
          mensaje: "Usuario creado con exito 😀",
          tipo: "alert alert-success",
          open: true,
        });
        setMensaje("Usuario creado con exito 😀");
      } else {
        setMensajeRegistro({
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

  return (
    <>
      <Header isSearch={false} isCarrito={false} isAdmin={false} />
      <div className="container-fluid col-md-6 offset-md-3">
        <h1>Crear cuenta</h1>
        {mensajeRegistro.open && (
          <div className={mensajeRegistro.tipo} role="alert">
            {mensajeRegistro.mensaje}
          </div>
        )}
        <div className="container  border rounded mt-3 py-5 px-5">
          <form
            className="row g-3 needs-validation"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="form-floating mb-3">
              <input
                value={user.nombre}
                name="nombre"
                onChange={handleUser}
                type="text"
                className="form-control"
                placeholder="Dan Brown"
                id="inputNombre"
                required
              />
              <label htmlFor="inputNombre" className="ms-1">
                Nombre completo
              </label>
              <div className="invalid-feedback">
                Debe ingresar su Nombre Completo.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                value={user.email}
                name="email"
                onChange={handleUser}
                type="email"
                className="form-control"
                placeholder="nombre@ejemplo.com"
                id="inputEmail"
                required
              />
              <label htmlFor="inputEmail" className="ms-1">
                Email
              </label>
              <div className="invalid-feedback">Debe ingresar su correo.</div>
            </div>

            <div className="form-floating">
              <input
                value={user.password}
                name="password"
                onChange={handleUser}
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                required
              />
              <label htmlFor="inputPassword" className="ms-1">
                Password
              </label>
              <div className="invalid-feedback">Debe ingresar su password</div>
            </div>
            <div className="form-floating">
              <input
                value={user.direccion}
                name="direccion"
                onChange={handleUser}
                type="text"
                className="form-control"
                id="inputDireccion"
                placeholder="Los rios 123, Providencia"
                required
              />
              <label htmlFor="inputDireccion" className="ms-1">
                Dirección
              </label>
              <div className="invalid-feedback">Debe ingresar su direccion</div>
            </div>
            <div className="form-floating">
              <input
                value={user.ciudad}
                name="ciudad"
                onChange={handleUser}
                type="text"
                className="form-control"
                id="inputCiudad"
                placeholder="Santiago"
                required
              />
              <label htmlFor="inputCiudad" className="ms-1">
                Ciudad
              </label>
              <div className="invalid-feedback">Debe ingresar su ciudad</div>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center mt-5">
              <button
                type="submit"
                className="btn btn-filtros text-uppercase fw-light"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

Registro.propTypes = {};

export default Registro;
