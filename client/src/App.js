import "./_app.scss";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Error404 from "./pages/Error404";
import Category from "./pages/Category";
import ControlPanel from "./pages/Admin";
import CartPage from "./pages/CartPage";
import ProductReview from "./components/createReview/renderReviewCreate/index";

import { getProducts, getCategories, getReviewsProduct } from "./redux/actions";
import Nav from "./components/Nav";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    setTimeout(() => dispatch(getProducts()), 1000);
    dispatch(getProducts());
    dispatch(getReviewsProduct());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/producto/:id" element={<Detail />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/controlPanel" element={<ControlPanel />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reviewsPost" element={<ProductReview />} />
      </Routes>
    </div>
  );
}

export default App;
