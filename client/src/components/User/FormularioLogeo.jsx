import React from "react";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { postUser } from "../../redux/actions";
export default function FormularioLogeo() {

    const dispatch = useDispatch();



    const [input, setInput] = useState({
        fullName: "",
        password: "",
        email: "",
        id_document: "",
        role: "",
      });

      function handleChangeInput(e) {
          e.preventDefault()
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
       
    
        console.log(input);
      }
      function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postUser(input));
    
        setInput({

         fullName: "",
         password: "",
         email: "",
         id_document: "",
         role: "",

        });
        alert("registro Exitoso");
       
      }

    return(
        <div>

            <h1>Registrarse</h1>

            <form onSubmit={e => handleSubmit(e)}>
            <div className="elementosForm">
            <label>FullName : </label>
            <input
              type="text"
              placeholder="Nombre Completo"
              value={input.fullName}
              name="fullName"
              onChange={e => handleChangeInput(e)}
              
            />
          </div>
          <div className="elementosForm">
            <label>password : </label>
            <input
              type="text"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={e => handleChangeInput(e)}
              
            />
               </div>
          <div className="elementosForm">
            <label> Email: </label>
            <input
              type="text"
              placeholder="Email"
              value={input.email}
              name="email"
              onChange={e => handleChangeInput(e)}
              
            />
               </div>
     
          <div className="elementosForm">
            <label>documento de identidad : </label>
            <input
              type="text"
              placeholder="documento"
              value={input.id_document}
              name="id_document"
              onChange={e => handleChangeInput(e)}
              
            />
          </div>
          <div className="elementosForm">
            <label>Role : </label>
            <input
              type="text"
              placeholder="role"
              value={input.role}
              name="role"
              onChange={e => handleChangeInput(e)}
              
            />
          </div>

          <button type="submit" >Registrarse </button>

            </form>

        </div>
    )


}