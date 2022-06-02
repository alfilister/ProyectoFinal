import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SearchBar from "../SearchBar";

import { sortByName, sortByRating, filters } from "../../redux/actions";

const Filters = ({ setSorted }) => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.copyProducts);

  const prices = products.map((el) => el.price);

  const maxPrice = Math.max(...prices);
  console.log(maxPrice);
  const minPrice = Math.min(...prices);
  console.log(minPrice);

  const [sortOrder, setOrder] = useState({
    name: "Alphabet AZ",
    rating: "By Rating ⭐",
  });

  const [filtros, setFiltros] = useState({
    category: "all",
    min: minPrice,
    max: maxPrice,
  });

  // Ordenamiento por nombre
  const handleSortByName = (event) => {
    dispatch(sortByName(event.target.value));
    // setCurrentPage(1)
    setOrder({
      name: event.target.value,
      rating: "By Rating ⭐",
    });
    setSorted(event.target.value);
  };

  // Ordenamiento por nombre
  const handleSortByRating = (event) => {
    dispatch(sortByRating(event.target.value));
    // setCurrentPage(1)

    setOrder({
      name: "Alphabet AZ",
      rating: event.target.value,
    });
    setSorted(event.target.value);
  };

  const handleFilters = (event) => {
    event.preventDefault();
    dispatch(filters(filtros));
  };

  const handleReset = (event) => {
    event.preventDefault();
    setFiltros({
      category: "all",
      min: minPrice,
      max: maxPrice,
    });
    dispatch(
      filters({
        category: "all",
        min: minPrice,
        max: maxPrice,
      })
    );
    const categoryFilterInput = document.getElementById("categoryFilter");
    categoryFilterInput.selectedIndex = 0;
  };

  const handleInputMin = (event) => {
    if (!event.target.value) {
      setFiltros({
        ...filtros,
        min: minPrice,
      });
    } else {
      setFiltros({
        ...filtros,
        min: event.target.value,
      });
    }
  };

  const handleInputMax = (event) => {
    if (!event.target.value) {
      setFiltros({
        ...filtros,
        max: maxPrice,
      });
    } else {
      setFiltros({
        ...filtros,
        max: event.target.value,
      });
    }
  };

  const handleInputCategory = (event) => {
    setFiltros({
      ...filtros,
      category: event.target.value,
    });
  };

  return (
    <div className="filterBar">
      <SearchBar />
      <div className="sortsBy">
        <h3>Sort By</h3>

        <select
          onChange={(event) => {
            handleSortByName(event);
          }}
          value={sortOrder.name}
        >
          <option disabled>Alphabet AZ</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
        </select>

        <select
          onChange={(event) => {
            handleSortByRating(event);
          }}
          value={sortOrder.rating}
        >
          <option disabled>By Rating ⭐</option>
          <option value="asc">Asc</option>
          <option value="des">Des</option>
        </select>
      </div>

      <div className="filterBy">
        <h3>Filter By</h3>

        <form>
          <label>Category</label>
          <select
            id="categoryFilter"
            className="categoryFilter"
            onChange={(event) => handleInputCategory(event)}
          >
            <option value="all">All</option>
            {categories?.map((c) => {
              return (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>

          <label>Price Range</label>
          <div className="priceSelector">
            <input
              type="number"
              min={filtros.min}
              max={filtros.max}
              step="1"
              placeholder={filtros.min}
              value={filtros.min}
              onChange={(event) => handleInputMin(event)}
            />
            <p>to</p>
            <input
              type="number"
              min={filtros.min}
              max={filtros.max}
              step="1"
              value={filtros.max}
              placeholder={filtros.max}
              onChange={(event) => handleInputMax(event)}
            />
          </div>
          <button type="submit" onClick={(event) => handleFilters(event)}>
            Apply filters
          </button>
          <button onClick={(event) => handleReset(event)}>Reset filters</button>
        </form>
      </div>
    </div>
  );
};

export default Filters;
