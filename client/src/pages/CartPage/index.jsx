import React, { useState } from "react"
import Nav from "../../components/Nav"
import { useSelector } from "react-redux"
import CartProduct from "../../components/cartProduct"
import CategoryGrid from "../../components/CategoryGrid"

function CartPage() {
  const initialCart = useSelector((state) => state.cart)

  var subTotal = []
  initialCart?.map((el) => subTotal.push(el.quantity * el.product.price))

  var finalValue = subTotal[0] && subTotal.reduce((a, c) => a + c).toFixed(2)

  const [total, setTotal] = useState(finalValue)
  var taxIva = (Number(total) * 0.19).toFixed(2)
  var final = (Number(total) + Number(taxIva)).toFixed(2)

  return (
    <div>
      {!initialCart[0] ? (
        <div className="emptyCart">
          <h2>Empty cart, feel free to explore our categories</h2>
          <CategoryGrid />
        </div>
      ) : (
        <div className="cartPage">
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
            <div className="line"></div>
            <h3>SubTotal $ {total}</h3>
            <h3>Taxes $ {taxIva}</h3>
            <h2>Total $ {final}</h2>
            <button>Proceed to checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
