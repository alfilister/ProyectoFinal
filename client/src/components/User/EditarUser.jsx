import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUsersByEmail  , postUser , getUserById} from "../../redux/actions";


const EditarUser = () => {

  const dispatch = useDispatch();  
  const bucket = [];
  const { user, isAuthenticated } = useAuth0();

  isAuthenticated && bucket.push({ email: user.email, name: user.name });
  //ingreso al bucket, que tiene tanto el email como el name y consigo el email
  const emailUser = bucket[0] && bucket[0].email;
  //traigo los datos filtrados en redux
  const infoUser = useSelector((state) => state.userEmailId);
  const idUser = infoUser[0] && infoUser[0].id; // en esta variable lo que hago es guardar el id del usuario para poder hacer el post y lo que envie es
 
    console.log('soy La info del usuario traida del back' , infoUser[0])
    console.log('soy el id  del usuario traida del back' , idUser)
  useEffect(() => {

    //despacho esta accion para que se llene el estado y se guarde en la variable infoUser la info del usuario traida del back 
    dispatch(getUsersByEmail(emailUser));

    
    
  }, [dispatch,emailUser]);


  const [input, setInput] = useState({
    id_document: "",
  });

  function handleChangeInput(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }
  function handleSubmit(e){

    e.preventDefault()      

    dispatch(postUser(input))
    alert('Documento guardado con exito')
    
    // una vez que se le envia la informacion por body al back y se cree el videogame , quiero que me lleve a la pagina home para ver todos los videojuegos
    
    }
  

  return (
    <div>
      <br />
      <br />
      <div>
        <label>Imagen</label>
        {isAuthenticated ? (
          <img className="img" src={user.picture} alt="" />
        ) : (
          <hi>'NO ESTAS LOGEADO'</hi>
        )}
      </div>
      <div>
        <label>Nombre Usuario:</label>
        {isAuthenticated ? <h3>{user.nickname}</h3> : <hi>''</hi>}
      </div>
      <div>
        <label>Email</label>
        {isAuthenticated ? <h3>{user.email}</h3> : <hi>''</hi>}
      </div>

      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Completa Este campo </label>
          <input
            type="text"
            placeholder="ingresa documento"
            name="id_document"
            value={input.id_document}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
      </form>
    </div>
  );
};
export default EditarUser;
