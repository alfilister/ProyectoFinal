import React from "react"
import { NavLink } from "react-router-dom"

const Card = ({ id, name, image, categories, price, rating, aux_images }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <div className="img">
        <img src={image} />
        <img
          className="image-hover"
          src={aux_images[0] ? aux_images[0] : image}
        />
      </div>

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
