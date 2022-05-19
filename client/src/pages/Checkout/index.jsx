import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";
import { completeDataOrder, setOrderCheckout } from "../../redux/actions";

function Checkout() {
  const stripePromise = loadStripe(
    "pk_test_51L1HPsAYXX7Bavv4uDeTk9tUjSb4ZzVcVDYWs7nw8gkmrlJGtHTI5O6CmiEqRadAWwBaCcc3j0b8v1bZAyKx1wy300bjsAkEqi"
  );

  const dispatch = useDispatch();
  const finalOrder = useSelector((state) => state.order);

  const [fields, setFields] = useState({
    receiver_phone: "",
    shipping_state: "",
    city: "",
    shipping_address: "",
    zip_code: "",
    status: "attempted",
  });

  const [showPay, setShowPay] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = (e, fields) => {
    e.preventDefault();
    setShowPay(true);
    dispatch(completeDataOrder(fields));
  };

  const handlePay = (e) => {
    e.preventDefault();
    dispatch(setOrderCheckout(finalOrder));
  };

  return (
    <div className="checkoutPage">
      <form>
        <input
          type="text"
          name="receiver_phone"
          placeholder="receiver phone"
          value={fields.receiver_phone}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="shipping_state"
          placeholder="state US"
          value={fields.shipping_state}
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

        <input
          onClick={(e) => handleConfirm(e, fields)}
          className="btnSbmt"
          type="submit"
          value="Confirm Shipping Information"
        />
      </form>
      {showPay && <button onClick={(e) => handlePay(e)}>Pay</button>}

      <Elements stripe={stripePromise}>
        <CardElement />
      </Elements>
    </div>
  );
}

export default Checkout;
