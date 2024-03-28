import { useContext } from "react";

import { MyContext } from "../componentes/context/MyContext.jsx";
import "../assets/css/carro.css";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

const Pago = () => {
  const { orden } = useContext(MyContext);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container mt-5 mb-5 text-center align-items-center">
          <div className=" orden-creada">
            <h2>Se ha generado la orden N° {orden}</h2>
            <p>Gracias por su compra</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pago;
