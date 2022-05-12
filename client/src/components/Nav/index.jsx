import React from "react";
import { NavLink } from "react-router-dom";

import NavBar from "../NavBar";

const Nav = ({ setCurrentPage }) => {
  return (
    <div>
      <NavLink
        to="/"
        style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
      >
        <h1>LOGO</h1>
      </NavLink>
      <NavBar setCurrentPage={setCurrentPage} />
      <NavLink to="#" style={{ textDecoration: "none", color: "black" }}>
        <h2>inicia sesion</h2>
      </NavLink>
      <NavLink to="#" style={{ textDecoration: "none", color: "black" }}>
        <h2>registrate</h2>
      </NavLink>
    </div>
  );
};

export default Nav;
