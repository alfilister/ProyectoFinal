import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Nav from "../../components/Nav"
import CardsContainer from "../../components/CardsContainer"
import Filters from "../../components/Filters"
import Card from "../../components/Card"
import { useDispatch, useSelector } from "react-redux"
import { filters } from "../../redux/actions"

function Category() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      filters({
        category: categoryName,
        min: 0,
        max: 1000,
      })
    )
  }, [dispatch])

  const suggestedOne = useSelector((state) => state.suggestedRandom)

  const { categoryName } = useParams()
  const [sorted, setSorted] = useState("")

  const navigate = useNavigate()
  const handleBack = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="categoryPage">
      <div className="categoryTitle">
        <h1>{categoryName.toUpperCase()}</h1>
      </div>
      <body>
        <div className="leftColumn">
          <div className="filter">
            <div className="blackBtn">
              <button onClick={(e) => handleBack(e)}>Back to home</button>
            </div>
            <Filters setSorted={setSorted} />
          </div>
          <div className="textInvite">
            <h2>Don't leave without inspect this beauty!</h2>
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
                  <Card
                    key={el.id}
                    id={el.id}
                    aux_images={el.aux_images}
                    name={el.name}
                    image={el.image}
                    price={el.price}
                    rating={el.rating}
                    fetured={el.featured}
                    categories={el.categories.map((el) => el.name).join(" | ")}
                  />
                )
              })
            )}
          </div>
        </div>
        <div className="cardContainer">
          <CardsContainer />
        </div>
      </body>
    </div>
  )
}

export default Category
