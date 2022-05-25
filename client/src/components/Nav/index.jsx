import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../scss/components/_nav.scss";
import logo from "../../scss/assets/logo.png";
import LoginButton from "../User/Login";
import LogOutButton from "../User/LogOut";
import Profile from "../User/profileUser";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers, resetOrder } from "../../redux/actions";

import { useEffect } from "react";
import { postUser } from "../../redux/actions";

const Nav = ({ setCurrentPage }) => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var cartCounter = useSelector((state) => state.cartCounter);
  const usersDb = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (isAuthenticated) {
      let objUser = {
        fullName: user.nickname,
        password: user.sub,
        email: user.email,
        image: user.picture,
      };
      dispatch(postUser(objUser));
      dispatch(getAllUsers());
    }
  }, []);

  if (isAuthenticated) {
    console.log("Estas Logeado");
  } else {
    console.log("Aun no hay nadie logeado");
  }

  /////////

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(resetOrder());
    navigate("/cart");
  };

  return (
    <div className="divNavbar">
      <div className="divSeachYLogo">
        <NavLink to="/" className="logo">
          <img className="logoImg" src={logo} alt="imagenLogo" />
        </NavLink>
        <NavLink to="/" className="tituloPag">
          <h2 className="tituloPag">E-commerCell</h2>
        </NavLink>
      </div>
      {usersDb[0] ? (
        <div className="prflContainer">
          <button
            className="btnProfileUser"
            onClick={() => navigate("/edituser")}
          >
            editProfile
          </button>
        </div>
      ) : (
        <div></div>
      )}

      <div className="logeo">
        {isAuthenticated ? (
          <>
            <div className="autenticated">
              <LogOutButton className="estiloSesion" />
              <Profile className="estiloProfile" />
            </div>
          </>
        ) : (
          <div className="loginButton">
            <LoginButton />
          </div>
        )}
        <div className="cartBtnNav">
          <button onClick={(e) => handleCart(e)}>Cart</button>
          <p className="cartCounter">{cartCounter}</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
