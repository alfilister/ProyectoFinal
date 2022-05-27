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
import {
  getAllUsers,
  getCategories,
  getProducts,
  getUsersByEmail,
  resetOrder,
} from "../../redux/actions";

import { useEffect } from "react";
import { postUser } from "../../redux/actions";

const Nav = ({ setCurrentPage }) => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var cartCounter = useSelector((state) => state.cartCounter);
  const usersDb = useSelector((state) => state.allUsers);

  let objUser = isAuthenticated && {
    fullName: user.nickname,
    password: user.sub,
    email: user.email,
    image: user.picture,
  };

  objUser && dispatch(postUser(objUser));

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(resetOrder());
    navigate("/cart");
  };

  const handleBtnProfile = (e) => {
    e.preventDefault();
    dispatch(getAllUsers());
    navigate("/edituser");
  };

  const handleHome = () => {
    dispatch(getCategories());
    dispatch(getProducts());
    navigate("/");
  };

  return (
    <div className="divNavbar">
      <div className="divSeachYLogo">
        <div onClick={() => handleHome()} className="logo">
          <img className="logoImg" src={logo} alt="imagenLogo" />
          <h2 className="tituloPag">E-commerCell</h2>
        </div>
      </div>
      {isAuthenticated ? (
        <div className="prflContainer">
          <button
            className="btnProfileUser"
            onClick={(e) => handleBtnProfile(e)}
          >
            Customer Page
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
      </div>
      <div className="cartBtnNav">
        <button onClick={(e) => handleCart(e)}>Cart</button>
        <p className="cartCounter">{cartCounter}</p>
      </div>
    </div>
  );
};

export default Nav;
