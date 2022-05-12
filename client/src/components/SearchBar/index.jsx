import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getProductsByName } from "../../redux/actions"

const validate = (input) => {
  let errorValidated = ""

  if (!input) {
    errorValidated = "Name is required to submit"
  } else if (!/^.{1,30}$/.test(input)) {
    errorValidated = "Max length 30 characters"
  } else if (!/^\S.*$/.test(input)) {
    errorValidated = "First character can not be an space"
  }
  return errorValidated
}

const SearchBar = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [errors, setErrors] = useState("")

  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
    setErrors(validate(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getProductsByName(name))
    setName("")
  }

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSubmit(e)
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <input
        type="text"
        placeholder="Encuentra tu articulo..."
        value={name}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        disabled={errors || name === "" ? true : false}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  )
}

export default SearchBar
