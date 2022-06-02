import React, { useState } from "react";
import { useDispatch } from "react-redux";

import StarRating from "../startRating/index";
import Swal from "sweetalert2";

import { postReview } from "../../../redux/actions";

export default function RenderReviewCreate({ idProduct, idUser }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    product_id: idProduct,
    user_id: idUser,
    product_review: "",
    score_review: "",
  });

  const [stars, setStars] = useState(false);

  function handleChangeInputReview(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setStars(true);
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

    Swal.fire({
      icon: "success",
      title: "Complete!",
      text: "Your review was created successfully!",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    // alert("Reseña publicada");
    // window.location.reload();
  }

  return (
    <div className="StarConteiner">
      <div className="scoreProduct">
        <label> Score review:</label>
        <input
          type="number"
          step="0.5"
          min={0}
          max={5}
          maxLength={0}
          placeholder="rate between 0 to 5"
          value={input.score_review}
          name="score_review"
          onChange={handleChangeInputReview}
          id="stars"
          className="scoreStar"
        />
      </div>
      {stars ? <StarRating stars={input.score_review} /> : <div></div>}

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Share your experience:</label>
        <textarea
          rows="10"
          cols="40"
          type="text"
          value={input.product_review}
          name="product_review"
          onChange={handleChangeInputReview}
          className="textReview"
        />

        <button type="submit"> Send </button>
      </form>
    </div>
  );
}
