import React from "react";
import { NavLink } from "react-router-dom";

import SearchBar from "../SearchBar";
import "../../scss/components/_nav.scss";
import logo from "../../scss/assets/logo.png";

const Nav = ({ setCurrentPage }) => {
  return (
    <div className="divNavbar">
      <div className="divSeachYLogo">
        <NavLink
          to="/"
          style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          className="logo"
        >
          <h2 className="tituloPag">E-comerce Cell</h2>
          <img className="logoImg" src={logo} alt="imagenLogo" />
        </NavLink>
      </div>
      <div className="searchBarStylo">
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div className="textosNav">
        <NavLink to="#" className="estiloSesion">
          <h2>inicia sesion</h2>
        </NavLink>
        <NavLink to="#" className="estiloRegistro">
          <h2>registrate</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
