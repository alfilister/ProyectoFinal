import "./_app.scss"
import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Home from "./pages/Home"
import Detail from "./pages/Detail"
import Error404 from "./pages/Error404"
import Category from "./pages/Category"

import { getProducts, getCategories } from "./redux/actions"
import ControlPanel from "./pages/Admin"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/producto/:id" element={<Detail />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/controlPanel" element={<ControlPanel/>} />
      </Routes>
    </div>
  )
}

export default App
