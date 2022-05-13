import React from "react";
import {useAuth0} from '@auth0/auth0-react';

export default function Profile (){
    const {user ,isAuthenticated , isLoading} = useAuth0();

    if(isLoading){
        return <div>loading...</div>
    }
    return (
        isAuthenticated && (
          <div>
               <img src = {user.picture} alt = {user.name} />
               <h2> name : {user.name}</h2>
               <p> usuario : {user.email}</p>
          </div>
        )
    )
}