import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { MyContext } from "../componentes/context/MyContext.jsx";
import PropTypes from "prop-types";
import Header from "../componentes/Header.jsx";
import Footer from "../componentes/Footer.jsx";
import GrillaLibros from "../componentes/GrillaLibros.jsx";

const Home = (props) => {
  const { productos, setProductos } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header />
      <GrillaLibros />
      <Footer />
    </>
  );
};

Home.propTypes = {};

export default Home;
