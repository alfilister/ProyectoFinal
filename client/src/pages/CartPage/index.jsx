import React, { useState } from "react"
import Nav from "../../components/Nav"
import { useSelector } from "react-redux"
import CartProduct from "../../components/cartProduct"

function CartPage() {
  const initialCart = useSelector((state) => state.cart)

  var subTotal = []
  initialCart?.map((el) => subTotal.push(el.quantity * el.product.price))

  var finalValue = subTotal[0] && subTotal.reduce((a, c) => a + c).toFixed(2)

  const [total, setTotal] = useState(finalValue)

  return (
    <div className="cartPage">
      <Nav />
      <div className="itemsInCart">
        {initialCart?.map(
          (el) =>
            el.quantity > 0 && (
              <CartProduct
                key={el.id}
                id={el.id}
                quantity={el.quantity}
                product={el.product}
                setTotal={setTotal}
                total={total}
              />
            )
        )}
      </div>

      <div className="totalAmount">
        <h3>Total Purchase</h3>
        <h3>{total}</h3>
      </div>
    </div>
  )
}

export default CartPage
