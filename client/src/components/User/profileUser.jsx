import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    isAuthenticated && (
      <div className="containerProfile">
        <div className="datos" >
          <p>Usuario:</p>
          <p>{user.name}</p>
          <p>Mail:</p>
          <p>{user.email}</p>
        </div>
        <img src={user.picture} alt={user.name} />
      </div>
    )
  );
}
