import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/actions";
import "../../scss/pages/_created.scss";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

//funcion validadora para hacer el formulario controlado
function validate(input) {
  let errors = {};
  let nameRequiere = /^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/;
  let numbers = /^[0-9]*[1-9][0-9]*$/;
  // let urlValidate = /\.(gif|jpeg|jpg|png|webp)$/i;

  if (!input.name) {
    errors.name = "Name required";
  } else if (input.name.length < 2 || input.name.length > 50) {
    errors.name = "At least 2 characters";
  } else if (!nameRequiere.test(input.name)) {
    errors.name = "Only words, numbers and hiphens";
  }
  if (!input.price || input.price === 0) {
    errors.price = "Price required";
  } else if (!numbers.test(input.price)) {
    errors.price = "Price must be a positive number";
  }
  if (!input.stock || input.stock === 0) {
    errors.stock = "Set Stock";
  } else if (!numbers.test(input.stock)) {
    errors.stock = "Stock at least one";
  }

  if (input.categories.length === 0) {
    errors.categories = "At least one category";
  }
  return errors;
}
const Create = () => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auxImg = [];
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
    Swal.fire({
      icon: "success",
      title: "Complete!",
      text: "Your product was created successfully!",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
    // alert("tu Producto se creo con exito"); (lo cambio por un sweet alert)
  }

  function getImage(element) {
    const { files } = element.target;
    if (files.length === 1) {
      var file = files.item(0);
      var reader = new FileReader();
      reader.onloadend = function () {
        setInput({
          ...input,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  const read = (file) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      // console.log("RESULTS", reader.result);
      auxImg.push(reader.result);
      // setProductSelected({
      // 	...productSelected,
      // 	aux_images: [...productSelected.aux_images, reader.result],
      // });
    };
    reader.readAsDataURL(file);
  };

  const getMuchImages = (event) => {
    const { files } = event.target;
    if (files) {
      [].forEach.call(files, read);
    }
    setInput({
      ...input,
      aux_images: auxImg,
    });
  };
  return (
    <div className="formContainer">
      <br />
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="elementosForm mb-3">
            <label className="form-label">Name : </label>
            <input
              className="form-control"
              type="text"
              placeholder="set product name"
              value={input.name}
              name="name"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            {errors.name && <div className="form-errors">{errors.name}</div>}
          </div>
          <div className="elementosForm mb-3">
            <label className="form-label">Main Image:</label>
            <input
              className="form-control"
              onChange={(event) => {
                getImage(event);
              }}
              type="file"
              name="image"
              accept="image/png, image/jpeg"
            ></input>
          </div>
          <div className="elementosForm mb-3">
            <label className="form-label">Aux Images:</label>
            <input
              className="form-control"
              onChange={(event) => {
                getMuchImages(event);
              }}
              type="file"
              name="aux_images"
              accept="image/png, image/jpeg"
              multiple
            ></input>
          </div>

          <div className="elementosForm mb-3">
            <label className="form-label">Price : </label>
            <input
              className="form-control"
              type="text"
              placeholder="price"
              value={input.price}
              required
              name="price"
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            {errors.price && <div className="form-errors">{errors.price}</div>}
          </div>

          <div className="elementosForm mb-3">
            <label className="form-label">Description : </label>
            <input
              className="form-control"
              type="text"
              placeholder="set description"
              value={input.description}
              name="description"
              required
              onChange={handleChangeInput}
            />
          </div>

          <div className="elementosForm mb-3">
            <label className="form-label">Discount : </label>
            <input
              className="form-control"
              type="number"
              step="5"
              min="0"
              max="10"
              placeholder="discount"
              value={input.discount}
              name="discount"
              onChange={handleChangeInput}
            />
          </div>

          <div className="elementosForm mb-3">
            <label className="form-label">Stock : </label>
            <input
              className="form-control"
              type="number"
              step="1"
              min="0"
              max="5"
              placeholder="stock"
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
                  <div className="divgroup mb-3" key={e.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={e.name}
                      value={e.name}
                      id={e.id}
                      key={e.name}
                      onChange={(e) => handleSelect(e)}
                    ></input>
                    <label
                      className="form-label form-check-label"
                      key={e.id * 100}
                    >
                      {e.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            {" "}
            Add Product{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
