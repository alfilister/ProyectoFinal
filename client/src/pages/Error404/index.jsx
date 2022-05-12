import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h1>
        No capo, esta pagina no existe, volve al <Link to="/">home</Link>
      </h1>
    </div>
  );
};

export default Error404;
