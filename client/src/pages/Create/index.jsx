import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";
import "../../scss/pages/_created.scss";
import styleCV from "../Create/Create.module.css";

//funcion validadora para hacer el formulario controlado
function validate(input) {
  let errors = {};
  let nameRequiere = /^[a-zA-Z]+$/;
  let numbers = /^[0-9]*[1-9][0-9]*$/;
  let urlValidate = /\.(gif|jpeg|jpg|png|webp)$/i;

  if (!input.name) {
    errors.name = "Requiere Nombre";
  } else if (input.name.length < 2 || input.name.length > 50) {
    errors.name = "Minimo 2 caracteres";
  } else if (!nameRequiere.test(input.name)) {
    errors.name = "El nombre solo pueden ser letras";
  }
  if (!input.price || input.price === 0) {
    errors.price = "Ingrese precio";
  } else if (!numbers.test(input.price)) {
    errors.price = "El precio debe ser un numero positivo";
  }
  if (!input.stock || input.stock === 0) {
    errors.stock = "Ingrese Stock";
  } else if (!numbers.test(input.stock)) {
    errors.stock = "El stock deberia ser minimo 1";
  }

  if (!input.image) {
    errors.image = "Se requiere imagen";
  } else if (!urlValidate.test(input.image)) {
    errors.image = "Coloque un URL valida";
  }
  if (input.categories.length === 0) {
    errors.categories = "Se requiere al menos una categoria";
  }
  return errors;
}
const Create = () => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  //const history = useHistory()

  // console.log("esto son categorias", categories);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: "",
    aux_images: [],
    description: "",
    discount: "",
    stock: "",
    rating: "",
    categories: [],
  });

  function handleChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      categories: [...input.categories, e.target.value],
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
      categories: [],
    });
    //history.push('/')
  }

  return (
    <div className="view">
      <div className="formContainer">
        <div className="message">
          <Link to="/">
            <button>VOLVER</button>
          </Link>
          <h1>Cargar datos de articulo</h1>
        </div>
        <div className="form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Nombre : </label>
              <input
                className={styleCV.input}
                type="text"
                placeholder="ingrese nombre producto"
                value={input.name}
                name="name"
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              {errors.name && <div className="form-errors">{errors.name}</div>}
            </div>

            <div>
              <label>imagen : </label>
              <input
                className={styleCV.input}
                type="text"
                placeholder="image"
                value={input.image}
                name="image"
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              {errors.image && (
                <div className="form-errors">{errors.image}</div>
              )}
            </div>

            <div>
              <label>precio : </label>
              <input
                className={styleCV.input}
                type="text"
                placeholder="precio"
                value={input.price}
                required
                name="price"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              {errors.price && (
                <div className="form-errors">{errors.price}</div>
              )}
            </div>

            <div>
              <label>descripcion : </label>
              <input
                className={styleCV.input}
                type="text"
                placeholder="ingrese descripcion"
                value={input.description}
                name="description"
                required
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
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              {errors.stock && (
                <div className="form-errors">{errors.stock}</div>
              )}
            </div>

            <div>
              <label>Rating : </label>
              <input
                className={styleCV.input}
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="rating"
                value={input.rating}
                name="rating"
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label> Categorias : </label>
              <select
                className={styleCV.select}
                onChange={(e) => handleSelect(e)}
              >
                {categories?.map((el) => (
                  <option key={el} value={input.el}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit"> Publicar Producto </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
