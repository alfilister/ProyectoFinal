import React, { useState } from "react"
import {Link} from 'react-router-dom'
import Nav from "../../components/Nav"
import CardsContainer from "../../components/CardsContainer"
import Filters from "../../components/Filters"

const Home = () => {
  const [sorted, setSorted] = useState("")

  return (
    <div>
      <Nav />
      {/* Filtros */}
      <Filters setSorted={setSorted} />
      <CardsContainer />
    </div>
  )
}

export default Home
