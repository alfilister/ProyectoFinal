import React from "react"

const Pagination = ({ productsPerPage, fullProducts, paginado }) => {
  const pageNumber = []

  for (let i = 1; i <= Math.ceil(fullProducts / productsPerPage); i++) {
    pageNumber.push(i)
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumber?.map((number) => {
          return (
            <button key={number} onClick={() => paginado(number)}>
              {number}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Pagination
