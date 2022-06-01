import "./_app.scss";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Error404 from "./pages/Error404";
import Category from "./pages/Category";
import ControlPanel from "./pages/Admin";
import CartPage from "./pages/CartPage";
import ProductReview from "./components/createReview/renderReviewCreate/index";
import EditarUser from "./components/User/EditarUser";

import {
  getProducts,
  getCategories,
  getReviewsProduct,
  getOrdersFromDb,
  getAllUsers,
  firstSetCount,
} from "./redux/actions";
import Nav from "./components/Nav";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    setTimeout(() => dispatch(getProducts()), 900);
    dispatch(getProducts());
    dispatch(getReviewsProduct());
    setTimeout(() => dispatch(getOrdersFromDb()), 50);
    dispatch(firstSetCount());
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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/reviewsPost" element={<ProductReview />} />
        <Route path="/EditUser" element={<EditarUser />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
