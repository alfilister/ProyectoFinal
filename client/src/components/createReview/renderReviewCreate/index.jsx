import React, { useState } from "react";
import { useDispatch } from "react-redux";

import StarRating from "../startRating/index";

import { postReview } from "../../../redux/actions";
import { Navigate, useNavigate } from "react-router-dom";

export default function RenderReviewCreate({ idProduct, idUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    product_id: idProduct,
    user_id: idUser,
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
      id_product: idProduct || null,
      id_user: idUser || null,
      product_review: "",
      score_review: 0,
    });

    alert("Reseña publicada");
    window.location.reload();
    //navigate("/");
  }

  return (
    <div className="StarConteiner">
      <StarRating stars={input.score_review} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Escribir Opinion:</label>
        <textarea
          rows="10"
          cols="40"
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

        <button type="submit"> Send </button>
      </form>
    </div>
  );
}
