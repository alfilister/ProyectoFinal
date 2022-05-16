import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";

export default function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <div className="containerLogOut">
      <div>
        <button
          id="button"
          className="reg"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Cerrar Sesion{" "}
        </button>
      </div>
    </div>
  );
}
