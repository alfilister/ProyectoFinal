import React from "react";
import { NavLink, Link } from "react-router-dom";

import SearchBar from "../SearchBar";
import "../../scss/components/_nav.scss";
import logo from "../../scss/assets/logo.png";
import LoginButton from "../User/Login";
import LogOutButton from "../User/LogOut";
import Profile from "../User/profileUser";
import { useAuth0 } from "@auth0/auth0-react";
const Nav = ({ setCurrentPage }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="divNavbar">
      <div className="divSeachYLogo">
        <NavLink
          to="/hola"
          style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          className="logo"
        >
          <Link to="/createProduct" className="searchBarStylo">
            Vender Articulo
          </Link>
          <h2 className="tituloPag">E-comerCell</h2>
          <img className="logoImg" src={logo} alt="imagenLogo" />
        </NavLink>
      </div>
      <div className="searchBarStylo">
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div className="logeo">
        {/*  <NavLink to="#" className="estiloSesion">
          <h2>inicia sesion</h2>
        </NavLink>
        <NavLink to="#" className="estiloRegistro">
          <h2>registrate</h2>
        </NavLink> */}

        {isAuthenticated ? (
          <>
            <LogOutButton className="estiloSesion" />
            <Profile className="estiloProfile" />
          </>
        ) : (
          <div className="loginButton">
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
