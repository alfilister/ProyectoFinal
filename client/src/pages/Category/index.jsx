import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardsContainer from "../../components/CardsContainer";
import Filters from "../../components/Filters";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { filters } from "../../redux/actions";

function Category() {
  const dispatch = useDispatch();
  const { categoryName } = useParams();

  useEffect(() => {
    dispatch(
      filters({
        category: categoryName,
        min: 0,
        max: 1000,
      })
    );
  }, [dispatch, categoryName]);

  const suggestedOne = useSelector((state) => state.suggestedRandom);

  const [sorted, setSorted] = useState("");

  const navigate = useNavigate();
  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="categoryPage">
      <div className="categoryTitle">
        <h1>{categoryName.toUpperCase()}</h1>
      </div>
      <body>
        <div className="leftColumn">
          <div className="filter">
            <Filters setSorted={setSorted} sorted={sorted} />
          </div>
          <div className="textInvite">
            <h2>Don't leave without inspect this beauty!</h2>
          </div>
          <div className="suggestedProduct">
            {!suggestedOne[0] ? (
              <div>
                <img
                  src="https://i.imgur.com/EQSYdeQ.gif"
                  alt="Loading..."
                  className="loaderHome"
                />
              </div>
            ) : (
              suggestedOne.map((el) => {
                return (
                  <Card
                    key={el.id}
                    id={el.id}
                    aux_images={el.aux_images}
                    name={el.name}
                    image={el.image}
                    stock={el.stock}
                    price={el.price}
                    rating={el.rating}
                    featured={el.featured}
                    categories={el.categories.map((el) => el.name).join(" | ")}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="cardContainer">
          <CardsContainer />
        </div>
      </body>
    </div>
  );
}

export default Category;
