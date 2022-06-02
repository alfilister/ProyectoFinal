import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="containerLogin">
      <div>
        <button id="button" className="log" onClick={() => loginWithRedirect()}>
          Loggin
        </button>
      </div>
    </div>
  );
}
