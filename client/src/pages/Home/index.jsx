import React, { useState } from "react"
import { Link } from "react-router-dom"
import Nav from "../../components/Nav"
import CardsContainer from "../../components/CardsContainer"
import Filters from "../../components/Filters"

const Home = () => {
  return (
    <div>
      {/* <Nav /> */}
      <CardsContainer />
    </div>
  )
}

export default Home
