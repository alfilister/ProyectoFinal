import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { sortByName, sortByRating, filters } from "../../redux/actions"

const Filters = ({ setSorted }) => {
  const { categoryName } = useParams()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories)

  const [sortOrder, setOrder] = useState({
    name: "Alphabet AZ",
    rating: "By Rating ⭐",
  })

  const [filtros, setFiltros] = useState({
    category: "all",
    price: 1000,
  })

  // Ordenamiento por nombre
  const handleSortByName = (event) => {
    dispatch(sortByName(event.target.value))
    // setCurrentPage(1)
    setOrder({
      name: event.target.value,
      rating: "By Rating ⭐",
    })
    setSorted(event.target.value)
  }

  // Ordenamiento por nombre
  const handleSortByRating = (event) => {
    dispatch(sortByRating(event.target.value))
    // setCurrentPage(1)

    setOrder({
      name: "Alphabet AZ",
      rating: event.target.value,
    })
    setSorted(event.target.value)
  }

  const handleFilters = (event) => {
    event.preventDefault()
    dispatch(filters(filtros))
  }

  const handleReset = (event) => {
    event.preventDefault()
    dispatch(
      filters({
        category: categoryName,
        price: 1000,
      })
    )
  }

  const handleInputRange = (event) => {
    setFiltros({
      ...filtros,
      price: event.target.value,
    })
  }

  const handleInputCategory = (event) => {
    setFiltros({
      ...filtros,
      category: event.target.value,
    })
  }

  return (
    <div className="filterBar">
      <div className="sortsBy">
        <h3>Sort By</h3>

        <select
          onChange={(event) => {
            handleSortByName(event)
          }}
          value={sortOrder.name}
        >
          <option disabled>Alphabet AZ</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
        </select>

        <select
          onChange={(event) => {
            handleSortByRating(event)
          }}
          value={sortOrder.rating}
        >
          <option disabled>By Rating ⭐</option>
          <option value="asc">Asc</option>
          <option value="des">Des</option>
        </select>
      </div>

      <div className="filterBy">
        <h3>Filter By</h3>

        <form>
          <label>Category</label>
          <select
            className="categoryFilter"
            onChange={(event) => handleInputCategory(event)}
          >
            <option value="all">All</option>
            {categories?.map((c) => {
              return (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              )
            })}
          </select>

          <label>Max price</label>
          <input
            className="priceFilter"
            onChangeCapture={(event) => handleInputRange(event)}
            type="range"
            min="0"
            max="1000"
          ></input>
          <label>{filtros.price}</label>
          <button type="submit" onClick={(event) => handleFilters(event)}>
            Apply filters
          </button>
          <button onClick={(event) => handleReset(event)}>Reset filters</button>
        </form>
      </div>
    </div>
  )
}

export default Filters
