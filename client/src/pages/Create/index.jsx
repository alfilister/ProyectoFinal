import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";
import styleCV from "../Create/Create.module.css";

//funcion validadora para hacer el formulario controlado
const Create = () => {
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  //const history = useHistory()

  //console.log('esto son categorias', categories)

  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    aux_images: [],
    description: "",
    discount: "",
    stock: "",
    rating: "",
    category: [],
  });

  function handleChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      category: [...input.category, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postProduct(input));
    alert("tu Producto se creo con exito");
    setInput({
      name: "",
      image: "",
      price: "",
      aux_images: [],
      description: "",
      discount: "",
      stock: "",
      rating: "",
      category: [],
    });
    //history.push('/')
  }

  return (
    <div className={styleCV.contenedor}>
      <Link to="/">
        <button>VOLVER</button>
      </Link>
      <h1>Crear tu producto</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre : </label>
          <input
            className={styleCV.input}
            type="text"
            placeholder="ingrese nombre producto"
            value={input.name}
            name="name"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label>imagen : </label>
          <input
            className={styleCV.input}
            type="text"
            placeholder="image"
            value={input.image}
            name="image"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label>precio : </label>
          <input
            className={styleCV.input}
            type="text"
            placeholder="precio"
            value={input.price}
            name="price"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label>descripcion : </label>
          <input
            className={styleCV.input}
            type="text"
            placeholder="ingrese descripcion"
            value={input.description}
            name="description"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label>discount : </label>
          <input
            className={styleCV.input}
            type="number"
            step="5"
            min="0"
            max="10"
            placeholder="rating"
            value={input.discount}
            name="discount"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label>Stock : </label>
          <input
            className={styleCV.input}
            type="number"
            step="1"
            min="0"
            max="5"
            placeholder="rating"
            value={input.stock}
            name="stock"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label>Rating : </label>
          <input
            className={styleCV.input}
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="rating"
            value={input.rating}
            name="rating"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label> Categorias : </label>
          <select className={styleCV.select} onChange={(e) => handleSelect(e)}>
            {categories?.map((el) => (
              <option key={el} value={input.el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <button type="submit"> Crea Tu Producto </button>
      </form>
    </div>
  );
};

export default Create;
