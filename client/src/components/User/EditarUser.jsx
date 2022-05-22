import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";



export default function EditarUser() {

    const {user , isAuthenticated} = useAuth0()
    //console.log(user.picture)



    const [input, setInput] = useState({

        id_document : "" ,  
      });

      function handleChangeInput(e) {
        e.preventDefault()
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      console.log(input)
    }

    return(
        <div>
            <br />
        <br />
            <div>
            <label>Imagen</label>
            {
                isAuthenticated ?  <img className="img" src={user.picture} alt="" />: <hi>'NO ESTAS LOGEADO'</hi>
            }
            </div>
            <div>
            <label>Nombre Usuario:</label>
            {
                isAuthenticated ? <h3>{user.nickname}</h3> : <hi>''</hi>
            }
            </div>
            <div>

            <label>Email</label>
            {
                isAuthenticated ? <h3>{user.email}</h3> : <hi>''</hi>
            }
            </div>

            <form>

                <div>
                <label > documento de identidad </label>
                <input
                type="text"               
                placeholder = 'ingresa documento'
                name = "id_document"
                value = {input.id_document}
                onChange={e =>handleChangeInput(e)}
                />
                </div>
            </form>

        </div>
    )

}