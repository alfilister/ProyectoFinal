import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Nav from "../../components/Nav"
import CardsContainer from "../../components/CardsContainer"
import Card from "../../components/Card"
import Filters from "../../components/Filters"
// import CardsContainer from "../../components/CardsContainer";
// <CardsContainer />

import { get_products, getCategories} from "../../redux/actions"

const Home = () => {
  const [sorted, setSorted] = useState('');

  return (
    <div>
      <Nav />
      {/* Filtros */}
      <Filters setSorted={setSorted}/>
      <CardsContainer />
    </div>
  )
}

export default Home
