import React from "react";
import { Link } from "react-router-dom";
import loaderFantasma from "../../scss/assets/fantasma.gif";

const Error404 = () => {
  return (
    <div className="body">
      <div className="mensaje">
        <h1>ERROR 404</h1>
        <p>Lo sentimos mucho colega, pero esta pagina no existe.</p>
        <p>
          podes volver a la <Link to="/">HOME</Link> con ese enlace 😉
        </p>
      </div>
      <div className="loader">
        <img src={loaderFantasma} alt="" />
      </div>
    </div>
  );
};

export default Error404;
