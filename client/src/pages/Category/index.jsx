import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Nav from "../../components/Nav"
import CardsContainer from "../../components/CardsContainer"
import Filters from "../../components/Filters"
import Card from "../../components/Card"
import { useDispatch, useSelector } from "react-redux"
import { suggestedProduct } from "../../redux/actions"

function Category() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(suggestedProduct())
  }, [dispatch])

  const [sorted, setSorted] = useState("")

  const suggestedOne = useSelector((state) => state.suggestedRandom)
  console.log(suggestedOne)

  const { categoryName } = useParams()

  return (
    <div className="categoryPage">
      {/* <Nav /> */}
      <div className="categoryTitle">
        <h1>{categoryName}</h1>
      </div>
      <body>
        <div className="filter">
          <Filters setSorted={setSorted} />
        </div>
        <div className="cardContainer">
          <CardsContainer />
        </div>
        <div className="suggestedProduct">
          {/* <Card
            id={el.id}
            aux_images={el.aux_images}
            name={el.name}
            image={el.image}
            price={el.price}
            rating={el.rating}
            categories={el.categories.map((el) => el.name).join(" | ")}
          /> */}
        </div>
      </body>
    </div>
  )
}

export default Category
