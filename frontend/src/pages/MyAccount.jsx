import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../componentes/context/MyContext.jsx";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

const MyAccount = () => {
  const { usuario, setUsuario } = useContext(MyContext);
  const [mensajeRegistro, setMensajeRegistro] = useState({
    mensaje: "",
    tipo: "",
    open: false,
  });
  const navigate = useNavigate();
  //console.log("token: ", window.sessionStorage.getItem("token"));
  useEffect(() => {
    getUsuario();
    //console.log("entre al useefect");
  }, []);
  async function getUsuario() {
    try {
      const token = window.sessionStorage.getItem("token");

      console.log("token", token);
      if (!token) {
        console.log("no hay token");
        navigate("/home");
      }
      //console.log("token micuenta: ", token);
      const response = await fetch(
        "http://localhost:3000/usuarios/id",
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
        sessionStorage.setItem("email", data[0].email);
        sessionStorage.setItem("rol", data[0].rol);
        setUsuario({
          id_usuario: data[0].id_usuario,
          nombre: data[0].nombre,
          email: data[0].email,
          direccion: data[0].direccion,
          ciudad: data[0].ciudad,
          token: data[0].token,
        });
        //console.log(usuario);
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
  //getUsuario();
  //useEffect(getUsuario(), []);

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
          <h1 className="text-uppercase ms-2">Mis Cuenta</h1>
          {mensajeRegistro.open && (
            <div className={mensajeRegistro.tipo} role="alert">
              {mensajeRegistro.mensaje}
            </div>
          )}
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
      </div>
      <Footer />
    </>
  );
};

MyAccount.propTypes = {};

export default MyAccount;
