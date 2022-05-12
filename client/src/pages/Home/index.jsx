import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../../components/Nav";
import Card from "../../components/Card";
// import CardsContainer from "../../components/CardsContainer";
// <CardsContainer />

import { get_products, getCategories } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_products());
    dispatch(getCategories());
  }, [dispatch]);

  const fullProducts = useSelector((state) => state.products);

  return (
    <div>
      <Nav />
      <h2>titulo random</h2>
      <div className="cards">
        {fullProducts.length === 0 ? (
          <div>
            <h2 className="h2">CARGANDO PRODUCTOS...</h2>
            <img
              src="https://i.imgur.com/EQSYdeQ.gif"
              alt="Loading..."
              className="loaderHome"
            />
          </div>
        ) : (
          fullProducts.map((el) => {
            return (
              <div key={el.id}>
                <Card
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  price={el.price}
                  rating={el.rating}
                  // categories={el.categories}
                  // genres={
                  //   !currentProducts[0].createdInDb
                  //     ? el.genres
                  //     : currentProducts[0].genres.join(" - ")
                  // }
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
