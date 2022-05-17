import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItemToCart, removeItemFromCart } from "../../redux/actions"

const CartProduct = ({ id, quantity, product, total, setTotal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [state, setState] = useState(quantity)

  const handleMinus = (e, id) => {
    e.preventDefault()
    if (state - 1 < 0) {
      dispatch(removeItemFromCart(id))
    } else {
      dispatch(removeItemFromCart(id))
      setTotal((Number(total) - product.price).toFixed(2))
      setState(state - 1)
    }
  }

  const handlePlus = (e, id) => {
    e.preventDefault()
    if (state + 1 > product.stock) {
      dispatch(addItemToCart(id))
    } else {
      dispatch(addItemToCart(id))
      setTotal((Number(total) + product.price).toFixed(2))
      setState(state + 1)
    }
  }

  return (
    <div className="cartProduct">
      <div>
        {/* <img src={product.image} alt="product" /> */}
        <p>{product.name}</p>
        <button onClick={(e) => handleMinus(e, id)}>-</button>
        <h3>{state}</h3>
        <button onClick={(e) => handlePlus(e, id)}>+</button>
        <h2>{(product.price * state).toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default CartProduct
