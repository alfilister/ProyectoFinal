import React, { useState } from "react";

import { useDispatch } from "react-redux";
import StarRating from "../startRating/index";
// import ChangeRating from "../changeRating/index";
import { postReview } from "../../../redux/actions";

export default function Rating() {
  const dispatch = useDispatch();

  // const [avgRating, setAvgRating] = useState({ score_review: 0 });
  const [input, setInput] = useState({
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

    // dispatch(postReview(avgRating));
    dispatch(postReview(input));

    setInput({
      product_review: "",
      score_review: 0,
    });
    // setAvgRating({ score_review: 0 });

    alert("Reseña publicada");
  }

  // const handleRating = (input) => {
  //   setAvgRating(input);
  //   console.log(input);
  // };

  return (
    <div className="App">
      <h1>Star Rating</h1>
      {/* <ChangeRating rating={avgRating} handleRating={handleRating} /> */}
      <StarRating stars={input.score_review} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Escribir Opinion:</label>
        <input
          type="text"
          value={input.product_review}
          name="product_review"
          onChange={handleChangeInputReview}
        />
        <input
          type="number"
          step="0.5"
          min="0"
          max="5"
          value={input.score_review}
          name="score_review"
          onChange={handleChangeInputReview}
        />

        <button type="submit"> Publicar reseña </button>
      </form>
    </div>
  );
}
