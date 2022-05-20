import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="containerProfile">
      {isAuthenticated && (
        <>
          <div className="infoUsuario">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <img src={user.picture} alt={user.name} className="img" />
          {/* <div className="infoImg"></div> */}
        </>
      )}
    </div>
  );
}
