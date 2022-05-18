import React, { useState } from "react";

import StarRating from "../startRating/index";
import ChangeRating from "../changeRating/index";
import { postReview } from "../../../redux/actions";

export default function Rating() {
  // Rating esto es un cambio para subir a la dev branch

  const [avgRating, setAvgRating] = useState(0);

  const handleRating = (input) => {
    setAvgRating(input);
  };

  return (
    <div className="App">
      <h1>Star Rating</h1>
      <ChangeRating rating={avgRating} handleRating={handleRating} />
      <br />
      <br />
      <StarRating stars={avgRating} />
    </div>
  );
}
