import React from "react"
import { useSelector } from "react-redux"

function CardSlider() {
  const featuredOnes = useSelector((state) => state.featProducts)

  return (
    <section>
      <div className="container"></div>
    </section>
  )
}

export default CardSlider
