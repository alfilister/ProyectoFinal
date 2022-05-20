import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";
import "../../scss/pages/_created.scss";
import { useNavigate } from "react-router-dom";

//funcion validadora para hacer el formulario controlado
function validate(input) {
  let errors = {};
  let nameRequiere = /^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/;
  let numbers = /^[0-9]*[1-9][0-9]*$/;
  let urlValidate = /\.(gif|jpeg|jpg|png|webp)$/i;

  if (!input.name) {
    errors.name = "Requiere Nombre";
  } else if (input.name.length < 2 || input.name.length > 50) {
    errors.name = "Minimo 2 caracteres";
  } else if (!nameRequiere.test(input.name)) {
    errors.name = "Solo letras, numeros y guiones";
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
  const navigate = useNavigate();

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
    if (e.target.checked) {
      setInput({
        ...input,
        categories: [...input.categories, e.target.value],
      });
    } else {
      setInput({
        ...input,
        categories: input.categories.filter((el) => el !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postProduct(input));

    setInput({
      name: "",
      image: "",
      price: "",
      aux_images: [],
      description: "",
      discount: "",
      stock: "",
      categories: [],
    });
    alert("tu Producto se creo con exito");
    navigate("/");
  }

  return (
    <div className="formContainer">
      <br />
      <div className="form">
        <div className="tituloCargar">
          <h1>Cargar datos de articulo</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="elementosForm">
            <label>Nombre : </label>
            <input
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

          <div className="elementosForm">
            <label>imagen : </label>
            <input
              type="text"
              placeholder="image"
              value={input.image}
              name="image"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            {errors.image && <div className="form-errors">{errors.image}</div>}
          </div>

          <div className="elementosForm">
            <label>precio : </label>
            <input
              type="text"
              placeholder="precio"
              value={input.price}
              required
              name="price"
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            {errors.price && <div className="form-errors">{errors.price}</div>}
          </div>

          <div className="elementosForm">
            <label>descripcion : </label>
            <input
              type="text"
              placeholder="ingrese descripcion"
              value={input.description}
              name="description"
              required
              onChange={handleChangeInput}
            />
          </div>

          <div className="elementosForm">
            <label>discount : </label>
            <input
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

          <div className="elementosForm">
            <label>Stock : </label>
            <input
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
            {errors.stock && <div className="form-errors">{errors.stock}</div>}
          </div>

          <div className="elementosForm">
            <div className="form-group-cb">
              {categories.map((e) => {
                return (
                  <div className="divgroup" key={e.id}>
                    <input
                      type="checkbox"
                      name={e.name}
                      value={e.name}
                      id={e.id}
                      key={e.name}
                      onChange={(e) => handleSelect(e)}
                    ></input>
                    <label key={e.id * 100}>{e.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <button type="submit"> Publicar Producto </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
