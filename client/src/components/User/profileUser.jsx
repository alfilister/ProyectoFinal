import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();





  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="containerProfile">
      {isAuthenticated && (
        <>
          <NavLink to="/edituser">
          <img src={user.picture} alt={user.name} className="img"  />
          </NavLink>
        </>
      )}
    </div>
  );
}
