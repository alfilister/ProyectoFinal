import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "../../components/cartProduct";
import CategoryGrid from "../../components/CategoryGrid";
import { addShippingStorage, setOrderCheckout } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

import Swal from "sweetalert2";

const validate = (fields) => {
  let errors = {};
  if (!fields.receiver_phone) {
    errors.receiver_phone = "required to proceed to checkout";
  } else if (!/^[0-9]{10,10}$/.test(fields.receiver_phone)) {
    errors.receiver_phone = "only numbers 10 digits length";
  }
  if (!fields.state) {
    errors.state = "required to proceed to checkout";
  } else if (!/^[A-Za-z.\s_-]{2,2}$/.test(fields.state)) {
    errors.state = "max 2 letters (eg. Georgia: GA)";
  }
  if (!fields.shipping_address) {
    errors.shipping_address = "required to proceed to checkout";
  }
  if (!fields.city) {
    errors.city = "required to proceed to checkout";
  }
  if (!fields.zip_code) {
    errors.zip_code = "required to proceed to checkout";
  } else if (!/^[0-9]{5,5}$/.test(fields.zip_code)) {
    errors.zip_code = "5 digits length, only numbers";
  }
  return errors;
};

function CartPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const idUserAuth = useSelector((state) => state.userEmailId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart);
  const initialShipping = useSelector((state) => state.shippingStorage);
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

  const parseLSinfo = initialShipping && initialShipping;

  const [fields, setFields] = useState(
    parseLSinfo
      ? {
          receiver_phone: parseLSinfo.receiver_phone,
          state: parseLSinfo.state,
          city: parseLSinfo.city,
          shipping_address: parseLSinfo.shipping_address,
          zip_code: parseLSinfo.zip_code,
          status: "attempted",
          total_purchase: final,
          cart_list,
          products_id,
          user_id: idUserAuth,
        }
      : {
          receiver_phone: "",
          state: "",
          city: "",
          shipping_address: "",
          zip_code: "",
          status: "attempted",
          total_purchase: final,
          cart_list,
          products_id,
          user_id: idUserAuth,
        }
  );

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...fields,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleConfirm = async (e, fields) => {
    e.preventDefault();
    if (
      errors.receiver_phone ||
      errors.state ||
      errors.city ||
      errors.shipping_address ||
      errors.zip_code
    ) {
      Swal.fire({
        icon: "warning",
        title: "Ups..",
        text: "Check the information registered, maybe one or more issues!",
        confirmButtonText: "Ok",
      });
      // alert("Check the information registered, maybe one or more issues");
    } else {
      await dispatch(setOrderCheckout(fields));
      dispatch(addShippingStorage(fields));
      navigate("/checkout");
    }
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
              <h3>Fill the shipping information</h3>
              <input
                type="text"
                maxLength={10}
                name="receiver_phone"
                placeholder="receiver phone"
                value={fields.receiver_phone}
                onChange={(e) => handleChange(e)}
              />
              {errors.receiver_phone && (
                <p className="errText">{errors.receiver_phone}</p>
              )}
              <input
                type="text"
                name="state"
                maxLength={2}
                placeholder="state US"
                value={fields.state}
                onChange={(e) => handleChange(e)}
              />
              {errors.state && <p className="errText">{errors.state}</p>}
              <input
                type="text"
                name="shipping_address"
                placeholder="shipping address"
                value={fields.shipping_address}
                onChange={(e) => handleChange(e)}
              />
              {errors.shipping_address && (
                <p className="errText">{errors.shipping_address}</p>
              )}
              <input
                type="text"
                name="city"
                placeholder="city"
                value={fields.city}
                onChange={(e) => handleChange(e)}
              />
              {errors.city && <p className="errText">{errors.city}</p>}
              <input
                type="text"
                maxLength={5}
                name="zip_code"
                placeholder="zip code"
                value={fields.zip_code}
                onChange={(e) => handleChange(e)}
              />
              {errors.zip_code && <p className="errText">{errors.zip_code}</p>}
            </form>
            <div className="line"></div>
            <h3>SubTotal $ {total}</h3>
            <h3>Taxes $ {taxIva}</h3>
            <h2>Total $ {final}</h2>

            {isAuthenticated ? (
              <button
                disabled={
                  !fields.zip_code ||
                  !fields.receiver_phone ||
                  !fields.state ||
                  !fields.shipping_address ||
                  !fields.city
                }
                className={
                  fields.zip_code &&
                  fields.receiver_phone &&
                  fields.state &&
                  fields.shipping_address &&
                  fields.city
                    ? "allowedBtn"
                    : "restrictedBtn"
                }
                onClick={(e) => handleConfirm(e, fields)}
              >
                Proceed to checkout
              </button>
            ) : (
              <button
                disabled={
                  !fields.zip_code ||
                  !fields.receiver_phone ||
                  !fields.state ||
                  !fields.shipping_address ||
                  !fields.city
                }
                className={
                  fields.zip_code &&
                  fields.receiver_phone &&
                  fields.state &&
                  fields.shipping_address &&
                  fields.city
                    ? "allowedBtn"
                    : "restrictedBtn"
                }
                onClick={() => loginWithRedirect()}
              >
                Loggin to checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
