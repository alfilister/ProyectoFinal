import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "../../components/cartProduct";
import CategoryGrid from "../../components/CategoryGrid";
import { setOrderCheckout } from "../../redux/actions";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart);
  const cart_list = useSelector((state) => state.cart).map((el) => [
    el.id,
    el.product.name,
    el.product.price,
    el.quantity,
  ]);
  const products_id = useSelector((state) => state.cart).map((el) => el.id);

  var subTotal = [];

  initialCart?.map((el) => subTotal.push(el.quantity * el.product.price));

  var finalValue = subTotal[0] && subTotal.reduce((a, c) => a + c).toFixed(2);

  const [total, setTotal] = useState(finalValue);

  var taxIva = (Number(total) * 0.19).toFixed(2);
  var final = (Number(total) + Number(taxIva)).toFixed(2);

  const [fields, setFields] = useState({
    receiver_phone: "",
    state: "",
    city: "",
    shipping_address: "",
    zip_code: "",
    status: "attempted",
    total_purchase: final,
    cart_list,
    products_id,
    user_id: "1",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = async (e, fields) => {
    e.preventDefault();
    await dispatch(setOrderCheckout(fields));
    navigate("/checkout");
  };

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
            <form className="shippingDataForm">
              <input
                type="text"
                name="receiver_phone"
                placeholder="receiver phone"
                value={fields.receiver_phone}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="state"
                placeholder="state US"
                value={fields.state}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="shipping_address"
                placeholder="shipping address"
                value={fields.shipping_address}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="city"
                placeholder="city"
                value={fields.city}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="zip_code"
                placeholder="zip code"
                value={fields.zip_code}
                onChange={(e) => handleChange(e)}
              />
            </form>
            <div className="line"></div>
            <h3>SubTotal $ {total}</h3>
            <h3>Taxes $ {taxIva}</h3>
            <h2>Total $ {final}</h2>

            <button onClick={(e) => handleConfirm(e, fields)}>
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
