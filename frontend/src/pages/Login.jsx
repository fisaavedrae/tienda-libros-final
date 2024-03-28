import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import "../assets/css/form.css";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const [mensajeRegistro, setMensajeRegistro] = useState({
    mensaje: "",
    tipo: "",
    open: false,
  });
  //const { setDeveloper } = useContext(Context)

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    ("use strict");
    console.log("entre a validar formß");

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

    if (!user.email.trim() || !user.password.trim()) {
      setMensajeRegistro({
        mensaje: "Email y password obligatorias",
        tipo: "alert alert-danger",
        open: true,
      });
      //return window.alert("Email y password obligatorias.");
    }

    if (!emailRegex.test(user.email)) {
      setMensajeRegistro({
        mensaje: "El formato del email no es correcto",
        tipo: "alert alert-danger",
        open: true,
      });
      //return window.alert("El formato del email no es correcto!");
    }
    llamarAPILogin();
  };

  async function llamarAPILogin() {
    try {
      const response = await fetch(
        "http://localhost:3000/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        } //+ user
      );
      const data = await response.json();
      //console.log("order:", filtros.order_by);
      console.log(user);
      if (data.status !== "Bad Request") {
        console.log("data login", data);
        window.sessionStorage.setItem("token", data.token);
        setMensajeRegistro({
          mensaje: "Usuario identificado con exito 😀",
          tipo: "alert alert-success",
          open: true,
        });
        navigate("/micuenta");
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
      <div className="container  col-md-6 offset-md-3">
        <h1>Login</h1>
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
                value={user.email}
                onChange={handleUser}
                type="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                id="validationCustom01"
                required
              />
              <label htmlFor="validationCustom01" className="ms-1">
                Email{" "}
              </label>
              <div className="invalid-feedback">Debe ingresar su correo.</div>
            </div>

            <div className="form-floating">
              <input
                value={user.password}
                onChange={handleUser}
                type="password"
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword" className="ms-1">
                Password
              </label>
              <div className="invalid-feedback">Debe ingresar su password</div>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center mt-5">
              <button
                type="submit"
                className="btn btn-filtros text-uppercase fw-light"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

Login.propTypes = {};

export default Login;
