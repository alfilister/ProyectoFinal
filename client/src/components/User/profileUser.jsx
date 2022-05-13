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
      <div>
        <img src={user.picture} alt={user.name} />
        <div className="divDataUser">
          <h2> Usuario: {user.name}</h2>
          <p> Mail: {user.email}</p>
        </div>
      </div>
    )
  );
}
