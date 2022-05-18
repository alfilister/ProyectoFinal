import React, { useState } from "react";

import StarRating from "../startRating/index";
import ChangeRating from "../changeRating/index";

export default function Rating() {
  // Rating
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
