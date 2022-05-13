import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions";
import styleCV from '../Create/Create.module.css'

//funcion validadora para hacer el formulario controlado
const Create = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);
  
  const categories = useSelector((state) => state.categories.data) 


  //console.log('esto son categorias', categories)

  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    aux_images: "",
    description: "",
    discount: "",
    stock : "" ,
    rating: "",
    category: [],
  
  });
  
  function handleChangeInput(e){

    setInput({
      ...input,
      [e.target.name ]: e.target.value
    })

    console.log(input)

    }
    
  function handleSelect (e){

    setInput({
      ...input, 
      category : [...input.category , e.target.value]
    
    })
   
  }

  return (

    <div className={styleCV.contenedor}>
      <Link to="/">
        <button  >VOLVER</button>
      </Link>
      <h1 >Crear tu producto</h1>
      
<form >


<div >
    <label>Nombre : </label>
    <input className={styleCV.input}
    type="text"
    placeholder="ingrese nombre producto"
    value={input.name}            
    name="name"
    onChange={handleChangeInput}
    />
</div>


<div>
    <label>imagen :   </label>  
    <input className={styleCV.input}
    type="text"
    placeholder="image"
    value={input.image} 
    name="image"
    onChange={handleChangeInput}
  />
           
</div>


<div >
    <label>precio : </label>
    <input className={styleCV.input}
    type="text"
    placeholder="precio"
    value={input.price}
    name="price"
    onChange={handleChangeInput}
   
  />

            
</div>

<div>
    <label>descripcion : </label>
    <input className={styleCV.input}
    type="text"
    placeholder="ingrese descripcion"
    value={input.description}
    name="description"
    onChange={handleChangeInput}
   
    
  />
</div>

<div >
    <label>discount </label>
    <input className={styleCV.input}
    type="number"
    step="5"
    min="0" max="10"
    placeholder="rating"
    value={input.discount}
    name="discount"
    onChange={handleChangeInput}
       
  />    
</div>

<div >
    <label>Stock </label>
    <input className={styleCV.input}
    type="number"
    step="1"
    min="0" max="5"
    placeholder="rating"
    value={input.stock}
    name="stock"
    onChange={handleChangeInput}
       
  />    
</div>

<div >
    <label>Rating : </label>
    <input className={styleCV.input}
    type="number"
    step="0.1"
    min="0" max="10"
    placeholder="rating"
    value={input.rating}
    name="rating"
    onChange={handleChangeInput}
  />

         
</div>


   <div > 

   <label> Categorias :  </label>
   <select onChange={e => handleSelect(e)}>
   {
      categories.map(el => (
        <option value={input.el}>{el}</option>
      ))
    }
     
   </select>

 </div>


   <button type='submit' > Crea Tu Producto </button>

</form >
</div>

    )
    }

export default Create;







  