import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";

export default function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <button
      className="cerrarSesion"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Cerrar Sesion{" "}
    </button>
  );
}
