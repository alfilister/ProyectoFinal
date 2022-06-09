import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";
import { authenticatedReact } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function LogOutButton() {
  const dispatch = useDispatch();
  const { logout } = useAuth0();

  const handleOut = (e) => {
    e.preventDefault();
    logout();
    dispatch(authenticatedReact());
  };

  return (
    <div className="containerLogOut">
      <div>
        <button id="button" className="reg" onClick={(e) => handleOut(e)}>
          Cerrar Sesion{" "}
        </button>
      </div>
    </div>
  );
}
