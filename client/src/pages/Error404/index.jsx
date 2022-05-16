import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="body">
      <h1>ERROR 404</h1>
      <p>Lo sentimos mucho colega, pero esta pagina no existe.</p>
      <p>
        podes volver a la <Link to="/">HOME</Link> con ese enlace 😉
      </p>
    </div>
  );
};

export default Error404;
