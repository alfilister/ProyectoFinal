import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ id, name, image, categories, price, rating }) => {
  return (
    <div className="card">
      <NavLink
        to={`/producto/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h3>{name}</h3>
        <img
          src={image}
          alt=""
          className="imageCard"
          height="200px"
          width="350px"
        />
      </NavLink>
      <span className="spanCard">{price}</span>
      <span className="spanCard">{` |${categories}| `}</span>
      <span className="spanCard">{rating}</span>
    </div>
  );
};

export default Card;
