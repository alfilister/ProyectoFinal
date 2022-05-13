import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Nav from "../../components/Nav"
import CardsContainer from "../../components/CardsContainer"

const Home = () => {
  return (
    <div>
      <Nav />
      <CardsContainer />
    </div>
  )
}

export default Home
