import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";


const EditarUser = () => {

  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch()
  const infoUser = useSelector((state) => state.allUsers);
  const Email = [];


  if (isAuthenticated) {

    let userEmail = user.email;
    Email.push(userEmail)

    console.log(userEmail)
  } else {
    console.log('logeo en false ')
  }

  console.log(Email)

  const userFilterbyId = infoUser.filter(el => el.email === Email[0])

  console.log('soy el usuario filtrado por email ', userFilterbyId)

  const [input, setInput] = useState({

    fullName : "",
    email : "",
    id_document : "",
    password:"",
    image: "",
  });

  function handleChangeInput(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault()

    setInput({
      ...input,
      fullName : userFilterbyId[0].fullName,
      email : userFilterbyId[0].email,
      id_document : "",
      password: userFilterbyId[0].password,
      image: userFilterbyId[0].image,

    })
    
    dispatch(updateUser(input))
    alert('Documento guardado con exito')
    //navigate('/')

    // una vez que se le envia la informacion por body al back y se cree el videogame , quiero que me lleve a la pagina home para ver todos los videojuegos
  }


  return (
    <div>
      <br />
      <br />
      <div>
        <label>Imagen</label>
        {isAuthenticated ? (
          <img className="img" src={userFilterbyId[0].image} alt="" />
        ) : (
          <hi>'NO ESTAS LOGEADO'</hi>
        )}
      </div>
      <div>
        <label>Nombre Usuario:</label>
        {isAuthenticated ? <h3>{userFilterbyId[0].fullName}</h3> : <hi>''</hi>}
      </div>
      <div>
        <label>Email</label>
        {isAuthenticated ? <h3>{userFilterbyId[0].email}</h3> : <hi>''</hi>}
      </div>

      <form onSubmit={e => handleSubmit(e)}>
      <div>
        <label>ingresa tu numero de documento </label>
        {userFilterbyId[0].id_document ? <h3>{userFilterbyId[0].id_document}</h3> : <input
          type="text"
          placeholder="ingresa documento"
          name="id_document"
          value={input.id_document}
          onChange= {(e)=> handleChangeInput(e)}

        />
        }
      </div>

      <button type='submit'>save</button>
      </form>
    </div>
  );
};
export default EditarUser;
