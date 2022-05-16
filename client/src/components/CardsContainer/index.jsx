import React, { useState } from "react"
import { useSelector } from "react-redux"

import Pagination from "../Pagination"
import Card from "../Card"

const CardsContainer = () => {
  const fullProducts = useSelector((state) => state.products)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(6)
  const indexOfLastProduct = currentPage * productsPerPage //15
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage // 0

  const currentProducts = fullProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <Pagination
        productsPerPage={productsPerPage}
        fullProducts={fullProducts?.length}
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
                  aux_images={el.aux_images}
                  name={el.name}
                  image={el.image}
                  price={el.price}
                  rating={el.rating}
                  featured={el.featured}
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
