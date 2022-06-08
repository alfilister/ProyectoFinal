import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function CategoryGrid() {
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/category/${name}`);
  };

  return (
    <div className="categoryGrid">
      {!categories[0] ? (
        <div>
          <h2 className="h2"></h2>
          <img
            src="https://i.imgur.com/EQSYdeQ.gif"
            alt="Loading..."
            className="loaderHome"
          />
        </div>
      ) : (
        categories.map((el) => {
          return (
            <div className="categoryTab" key={el.id}>
              <h2 onClick={(e) => handleClick(el.name)}>
                {el.name.toUpperCase()}
              </h2>
            </div>
          );
        })
      )}
    </div>
  );
}

export default CategoryGrid;
