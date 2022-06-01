import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";

function Favorites() {
  const favsState = useSelector((state) => state.favs);
  console.log(favsState);

  return (
    <div className="favPage">
      <div>
        {!favsState[0] ? (
          <h1>Have no favorites at the moment...</h1>
        ) : (
          <div>
            <h1>
              Here is your selection, remember that early birds get the worms!
            </h1>
            <div className="cardContainer">
              {favsState.map((el) => {
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
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
