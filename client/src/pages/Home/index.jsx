import React, { useState } from "react"
import { Link } from "react-router-dom"
import Nav from "../../components/Nav"
import CardSlider from "../../components/CardSlider"
import CategoryGrid from "../../components/CategoryGrid"

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <br></br>
      <CategoryGrid />
      <CardSlider />
    </div>
  )
}

export default Home
