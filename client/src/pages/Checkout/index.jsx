import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Filters from "../../components/Filters"
import Card from "../../components/Card"
import { useDispatch, useSelector } from "react-redux"
import { completeDataOrder } from "../../redux/actions"

function Checkout() {
  const dispatch = useDispatch()

  const [fields, setFields] = useState({
    receiver_phone: "",
    shipping_state: "",
    city: "",
    shipping_address: "",
    zip_code: "",
    status: "attempted",
  })

  const handleChange = (e) => {
    e.preventDefault()
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e, fields) => {
    e.preventDefault()
    dispatch(completeDataOrder(fields))
  }

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
          onClick={(e) => handleSubmit(e, fields)}
          className="btnSbmt"
          type="submit"
          value="Proceed to pay"
        />
      </form>
    </div>
  )
}

export default Checkout
