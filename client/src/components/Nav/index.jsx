<<<<<<< HEAD
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../scss/components/_nav.scss";
import logo from "../../scss/assets/logo.png";
import LoginButton from "../User/Login";
import LogOutButton from "../User/LogOut";
import Profile from "../User/profileUser";
import { useAuth0 } from "@auth0/auth0-react";
import { resetOrder } from "../../redux/actions";
const Nav = ({ setCurrentPage }) => {
<<<<<<< HEAD
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
=======
import React, {  useEffect } from 'react';
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
const Nav =  ({ setCurrentPage }) => {

  const { isAuthenticated , user } = useAuth0()
  const dispatch = useDispatch() ; 

 

  useEffect(() => {
    if(isAuthenticated){
      let objUser = {
        fullName : user.nickname,
        password : user.sub,
        email : user.email,
      }

      dispatch(postUser(objUser))
     }
  },)
  if(isAuthenticated){
    
    var contador = 0 ;
    console.log('1er console ' ,contador)
    
    console.log('2do console ' ,contador)
    
 
      if(contador <= 0){
        
        
     
      contador ++

      console.log(contador , 'se aumento contador despues de disparar accion')
    }
    
    
      console.log('datos que se envian por body al post', user.sub , user.nickname)
  }else{
      console.log('Aun no hay nadie logeado')
    }

 
  
  const navigate = useNavigate()
>>>>>>> 44b01dd0a0f115f34029b8eb36675dfedcd110f7
=======
	const { isAuthenticated } = useAuth0();
	const navigate = useNavigate();
	const dispatch = useDispatch();
>>>>>>> 510222788e6aa419d50d26fec13d9ad5dd59103e

	var cartCounter = useSelector((state) => state.cartCounter);

<<<<<<< HEAD
  
  const handleCart = (e) => {
    e.preventDefault();
    dispatch(resetOrder());
    navigate("/cart");
  };
=======
	const handleCart = (e) => {
		e.preventDefault();
		dispatch(resetOrder());
		navigate("/cart");
	};
>>>>>>> 510222788e6aa419d50d26fec13d9ad5dd59103e

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
			<div className="searchBarStylo"></div>
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
