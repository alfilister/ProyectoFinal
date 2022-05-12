import React from "react"
import { NavLink } from "react-router-dom"

const Card = ({ id, name, image, categories, price, rating }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <img
        src={image}
        alt=""
        className="imageCard"
        height="200px"
        width="350px"
      />
      <div className="info">
        <span>💲 {price}</span>
        <span>{` |${categories}| `}</span>
        <span>⭐ {rating}</span>
      </div>
      <div className="btn">
        <NavLink to={`/producto/${id}`}>
          <button>Details</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Card
