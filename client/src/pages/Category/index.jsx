import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Nav from "../../components/Nav"
import CardsContainer from "../../components/CardsContainer"
import Filters from "../../components/Filters"
import Card from "../../components/Card"
import { useSelector } from "react-redux"

function Category() {
  const [sorted, setSorted] = useState("")

  const suggestedOne = useSelector((state) => state.suggestedRandom)

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
          {!suggestedOne[0] ? (
            <div>
              <img
                src="https://i.imgur.com/EQSYdeQ.gif"
                alt="Loading..."
                className="loaderHome"
              />
            </div>
          ) : (
            suggestedOne.map((el) => {
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
                    categories={el.categories.map((el) => el.name).join(" | ")}
                  />
                </div>
              )
            })
          )}
        </div>
      </body>
    </div>
  )
}

export default Category
