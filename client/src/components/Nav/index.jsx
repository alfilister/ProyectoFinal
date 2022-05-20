import React from "react"
import { NavLink, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import "../../scss/components/_nav.scss"
import logo from "../../scss/assets/logo.png"
import LoginButton from "../User/Login"
import LogOutButton from "../User/LogOut"
import Profile from "../User/profileUser"
import { useAuth0 } from "@auth0/auth0-react"

import { postUser } from "../../redux/actions";
const Nav = ({ setCurrentPage }) => {

  const { isAuthenticated , user } = useAuth0()
  const dispatch = useDispatch() ; 


  
  if(isAuthenticated){
    /* 
    var userName = user.nickname ;
    var userEmail = user.email;
    var user1 = user ; 
    var contraseña = user.sub ; */
    
    dispatch(postUser({
      fullName : user.nickname,
      password : user.sub,
      email : user.email,
    }))
  



      //console.log(contraseña , userName)
  }else{
      console.log('Aun no hay nadie logeado')
    }

 
  
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
