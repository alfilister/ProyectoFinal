import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  addItemToCartLocalStorage,
  addCounterLocalStorage,
} from "../../redux/actions";

const Card = ({
  id,
  name,
  image,
  categories,
  stock,
  price,
  rating,
  aux_images,
  featured,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetail = (e) => {
    e.preventDefault();
    navigate(`/producto/${id}`);
  };

  const handleCart = async (e, id) => {
    e.preventDefault();
    await dispatch(addItemToCart(id));
    dispatch(addItemToCartLocalStorage());

    dispatch(addCounterLocalStorage());
  };

  return (
    <div className={featured === false ? "card" : "cardFeatured"}>
      {featured && <div className="featTag">⭐</div>}
      <h3>{name}</h3>
      <div className={stock ? "img" : "noStockImg"}>
        <img src={image} alt="Main" />
        <img
          className="image-hover"
          src={aux_images[0] ? aux_images[0] : image}
          alt="Alt"
        />
      </div>

      <div className="info">
        <span> $ {price}</span>
        <span>{` | ${categories} | `}</span>
        <span>⭐ {rating}</span>
      </div>
      <div className="btn">
        <button className="infoBtn" onClick={(e) => handleDetail(e)}>
          Details
        </button>
        {stock ? (
          <button className="infoBtn" onClick={(e) => handleCart(e, id)}>
            Add To Cart
          </button>
        ) : (
          <button className="outStockBtn">Out of Stock</button>
        )}
      </div>
    </div>
  );
};

export default Card;
