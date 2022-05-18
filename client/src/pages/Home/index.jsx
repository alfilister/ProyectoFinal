import React from "react"
import Nav from "../../components/Nav"
import CardSlider from "../../components/CardSlider"
import CategoryGrid from "../../components/CategoryGrid"

const Home = () => {
  return (
    <div className="home">
      <br></br>
      <CategoryGrid />
      <CardSlider />
    </div>
  )
}

export default Home
