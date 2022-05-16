import React from "react"
import { useNavigate } from "react-router-dom"

const Card = ({
  id,
  name,
  image,
  categories,
  price,
  rating,
  aux_images,
  featured,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/producto/${id}`)
  }

  return (
    <div className={featured === false ? "card" : "cardFeatured"}>
      {featured && <div className="featTag">⭐</div>}
      <h3>{name}</h3>
      <div className="img">
        <img src={image} />
        <img
          className="image-hover"
          src={aux_images[0] ? aux_images[0] : image}
        />
      </div>

      <div className="info">
        <span> $ {price}</span>
        <span>{` | ${categories} | `}</span>
        <span>⭐ {rating}</span>
      </div>
      <div className="btn">
        <button onClick={(e) => handleClick(e)}>Details</button>
      </div>
    </div>
  )
}

export default Card
