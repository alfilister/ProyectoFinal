import React, { useState } from "react";
import { useDispatch } from "react-redux";

import StarRating from "../startRating/index";

import { postReview } from "../../../redux/actions";

export default function Rating() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    id_product: null,
    id_user: null,
    product_review: "",
    score_review: 0,
  });

  function handleChangeInputReview(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postReview(input));
    setInput({
      id_product: null,
      id_user: null,
      product_review: "",
      score_review: 0,
    });

    alert("Reseña publicada");
  }

  return (
    <div className="StarConteiner">
      <StarRating stars={input.score_review} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Escribir Opinion:</label>
        <input
          type="text"
          value={input.product_review}
          name="product_review"
          onChange={handleChangeInputReview}
          className="textReview"
        />
        <label>Puntaje Producto:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={input.score_review}
          name="score_review"
          onChange={handleChangeInputReview}
          className="scoreStar"
        />

        <button type="submit"> Publicar reseña </button>
      </form>
    </div>
  );
}
