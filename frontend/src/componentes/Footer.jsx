import React from "react";
import PropTypes from "prop-types";

const Footer = (props) => {
  return (
    <>
      <footer className="py-3 my-4 mb-0 mt-4 pt-5">
        <p className="text-center text-body-secondary">
          © 2024 Desarrollado por{" "}
          <a href="https://github.com/rimar-basaa">Ricardo Barrientos</a> y{" "}
          <a href="https://fidatech.net/felipe">Felipe Saavedra</a>
        </p>
      </footer>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
