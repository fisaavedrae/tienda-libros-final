import React from "react";
import PropTypes from "prop-types";

const Spinner = (props) => {
  return (
    <div className="container text-center items-center align-items-center">
      <div className="spinner-border " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

Spinner.propTypes = {};

export default Spinner;
