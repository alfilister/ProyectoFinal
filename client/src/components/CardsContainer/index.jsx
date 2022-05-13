import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Pagination from "../Pagination"
import Card from "../Card"
import { getCategories, get_products } from "../../redux/actions"

const CardsContainer = () => {
  const dispatch = useDispatch()

  const fullProducts = useSelector((state) => state.products)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(6)
  const indexOfLastProduct = currentPage * productsPerPage //15
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage // 0

  const currentProducts = fullProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch(get_products())
  }, [dispatch])

  return (
    <div>
      <Pagination
        productsPerPage={productsPerPage}
        fullProducts={fullProducts.length}
        paginado={paginado}
      />
      <div className="cardContainer">
        {!currentProducts[0] ? (
          <div>
            <h2 className="h2">CARGANDO PRODUCTOS...</h2>
            <img
              src="https://i.imgur.com/EQSYdeQ.gif"
              alt="Loading..."
              className="loaderHome"
            />
          </div>
        ) : (
          currentProducts.map((el) => {
            return (
              <div key={el.id}>
                <Card
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  price={el.price}
                  rating={el.rating}
                  categories={el.categories.map((el) => el.name).join(" | ")}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default CardsContainer
