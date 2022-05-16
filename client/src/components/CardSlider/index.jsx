import React from "react"
import { useSelector } from "react-redux"
import Card from "../Card"

function CardSlider() {
  const featuredOnes = useSelector((state) => state.featProducts)

  return (
    <section className="cardSlider">
      <h3 className="invitation">Check our featured products!</h3>
      <div className="cardSpace">
        {!featuredOnes[0] ? (
          <div>
            <h2 className="h2">Loading Featured Items...</h2>
            <img
              src="https://i.imgur.com/EQSYdeQ.gif"
              alt="Loading..."
              className="loaderHome"
            />
          </div>
        ) : (
          featuredOnes.map((el) => {
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
    </section>
  )
}

export default CardSlider
