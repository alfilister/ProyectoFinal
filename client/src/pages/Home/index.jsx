import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Nav from "../../components/Nav"
import Card from "../../components/Card"
// import CardsContainer from "../../components/CardsContainer";
// <CardsContainer />

import { get_products, getCategories, sortByName, sortByRating } from "../../redux/actions"

const Home = () => {
  const dispatch = useDispatch()
  const [sorted, setSorted] = useState(''); 

  useEffect(() => {
    dispatch(get_products())
    dispatch(getCategories())
  }, [dispatch])

  const fullProducts = useSelector((state) => state.products)

  //Ordenamiento por nombre
  const handleSortByName = (event) => {
    dispatch(sortByName(event.target.value));
    // para cambiar el paginado a la primer pagina luego de ordenar
    //setCurrentPage(1);
    setSorted(event.target.value)
  }

  const handleSortByRating = (event) => {
    dispatch(sortByRating(event.target.value));
    // para cambiar el paginado a la primer pagina luego de ordenar
    //setCurrentPage(1);
    setSorted(event.target.value)
    console.log(fullProducts);
  }

  return (
    <div>
      <Nav />
      <h2>titulo random</h2>
      {/* Filtros */}
      <div>
        {/* Por nombre A-Z */}
        <select onChange={(event) => {handleSortByName(event)}}>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
        </select>
        {/* Por puntuacion */}
        <select onChange={(event) => {handleSortByRating(event)}}>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
        </select>
      </div>
      <div className="cards">
        {!fullProducts[0] ? (
          <div>
            <h2 className="h2">CARGANDO PRODUCTOS...</h2>
            <img
              src="https://i.imgur.com/EQSYdeQ.gif"
              alt="Loading..."
              className="loaderHome"
            />
          </div>
        ) : (
          fullProducts.map((el) => {
            return (
              <div key={el.id}>
                <Card
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  price={el.price}
                  rating={el.rating}
                  // categories={el.categories}
                  // genres={
                  //   !currentProducts[0].createdInDb
                  //     ? el.genres
                  //     : currentProducts[0].genres.join(" - ")
                  // }
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Home
