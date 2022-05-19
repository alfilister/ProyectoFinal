import React from "react";

import "../../scss/components/_user.scss";
import {NavLink} from 'react-router-dom'
export default function LoginButton() {


  return (
    <div className="containerLogin">
      <div >
        <NavLink to='/Login'>
          <button id='button' className="log" >
            Iniciar Sesion
          </button>
        </NavLink>
      </div>
    </div>
  );
}
