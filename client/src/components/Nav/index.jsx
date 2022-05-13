import React from "react";
import { NavLink } from "react-router-dom";
import LoginButton from "../User/Login";
import LogOutButton from "../User/LogOut";
import Profile from "../User/profileUser";
import { useAuth0 } from "@auth0/auth0-react";

import SearchBar from "../SearchBar";

const Nav = ({ setCurrentPage }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <NavLink
        to="/"
        style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
      >
        <h1>LOGO</h1>
      </NavLink>
      <SearchBar setCurrentPage={setCurrentPage} />
      {/* <NavLink to="#" style={{ textDecoration: "none", color: "black" }}>
        <h2>inicia sesion</h2>
      </NavLink> */}

      {/*    <NavLink to="#" style={{ textDecoration: "none", color: "black" }}>
        <h2>registrate</h2>
      </NavLink> */}
      {/* 
      <LoginButton />
      <LogOutButton /> */}
      {isAuthenticated ? (
        <>
          <LogOutButton />
          <Profile />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default Nav;
