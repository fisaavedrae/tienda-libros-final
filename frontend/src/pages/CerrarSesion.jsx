import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
const CerrarSesion = (props) => {
  window.sessionStorage.clear();
  return (
    <>
      <Header />
      <div className="container mt-5 mb-5 text-center align-items-center">
        <div className=" orden-creada">
          <h2>Se ha cerrado la sesión</h2>
          <p>
            <Link to="/">Volver al inicio</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

CerrarSesion.propTypes = {};

export default CerrarSesion;
