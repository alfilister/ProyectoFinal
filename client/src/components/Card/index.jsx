import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  addItemToCartLocalStorage,
  addCounterLocalStorage,
  addItemToFavs,
} from "../../redux/actions";

const Card = ({
  id,
  name,
  image,
  stock,
  price,
  rating,
  aux_images,
  featured,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const favState = useSelector((state) => state.favs);
  const validateFav = favState?.filter((el) => el.id == id);

  const handleDetail = (e) => {
    e.preventDefault();
    navigate(`/producto/${id}`);
  };

  const handleCart = async (e, id) => {
    e.preventDefault();
    await dispatch(addItemToCart(id));
    dispatch(addItemToCartLocalStorage());
    dispatch(addCounterLocalStorage());
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 200);
  };

  const handlefav = (e, id) => {
    e.preventDefault();
    dispatch(addItemToFavs(id));
  };

  return (
    <div className={featured === false ? "card" : "cardFeatured"}>
      <h3>{name}</h3>
      {featured && (
        <div className="featTag">
          <i className="fa-solid fa-star"></i>
        </div>
      )}
      <div className={stock ? "img" : "noStockImg"}>
        <img src={image} alt="Main" />
      </div>

      <div className="info">
        <span> $ {price}</span>

        <span>⭐ {rating}</span>
      </div>
      <div className="btn">
        <div className="conjuntoBoton">
          {stock ? (
            <div className="cart" onClick={(e) => handleCart(e, id)}>
              <i class="fa-solid fa-cart-plus"></i>
              <p className={added ? "added" : "hidden"}>Added</p>
            </div>
          ) : (
            <div></div>
          )}
          <button className="infoBtn" onClick={(e) => handleDetail(e)}>
            DETAILS
          </button>
          <div
            className={validateFav[0] ? "cardFav" : "cardNotFav"}
            onClick={(e) => handlefav(e, id)}
          >
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
