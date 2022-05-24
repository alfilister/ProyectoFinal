import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addCounterLocalStorage,
  addItemToCart,
  addItemToCartLocalStorage,
  removeItemFromCart,
  removeItemToCartLocalStorage,
} from "../../redux/actions";

const CartProduct = ({ id, quantity, product, total, setTotal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState(quantity);

  const handleMinus = async (e, id) => {
    e.preventDefault();
    if (state - 1 < 0) {
      dispatch(removeItemFromCart(id));
    } else {
      await dispatch(removeItemFromCart(id));
      dispatch(addCounterLocalStorage());
      setTotal((Number(total) - product.price).toFixed(2));
      setState(state - 1);
      dispatch(removeItemToCartLocalStorage());
    }
  };

  const handlePlus = async (e, id) => {
    e.preventDefault();
    if (state + 1 > product.stock) {
      dispatch(addItemToCart(id));
    } else {
      await dispatch(addItemToCart(id));
      dispatch(addCounterLocalStorage());

      setTotal((Number(total) + product.price).toFixed(2));
      setState(state + 1);
      dispatch(addItemToCartLocalStorage());
    }
  };

  const handleClickImg = (e, id) => {
    e.preventDefault();
    navigate(`/producto/${id}`);
  };

  return (
    <div className="cartProduct">
      <div className="imgCart">
        <img
          onClick={(e) => handleClickImg(e, id)}
          src={product.image}
          alt="product"
        />
      </div>
      <div className="cartInfo">
        <h3>{product.name}</h3>
        <h3>$ {product.price} per unit</h3>
        <h3>Available stock: {product.stock}</h3>
      </div>
      <div className="btnsCart">
        <button onClick={(e) => handleMinus(e, id)}>-</button>
        <h3>{state}</h3>
        <button onClick={(e) => handlePlus(e, id)}>+</button>
      </div>
      <div className="subTotal">
        <h2>$ {(product.price * state).toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CartProduct;
