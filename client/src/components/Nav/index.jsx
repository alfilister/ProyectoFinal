import React from "react"
import { NavLink, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import "../../scss/components/_nav.scss"
import logo from "../../scss/assets/logo.png"
import LoginButton from "../User/Login"
import LogOutButton from "../User/LogOut"
import Profile from "../User/profileUser"
import { useAuth0 } from "@auth0/auth0-react"
const Nav = ({ setCurrentPage }) => {
  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate()

  var cartCounter = useSelector((state) => state.cartCounter)

  const handleCart = (e) => {
    e.preventDefault()
    navigate("/cart")
  }

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
      <div className="searchBarStylo">
        <Link to="/createProduct" className="linkVender">
          Vender Articulo
        </Link>
      </div>
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
  )
}

export default Nav
