import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PRODUCTS_ID = "GET_PRODUCTS_ID";
export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";
export const SORT_PRODUCTS_BY_NAME = "SORT_PRODUCTS_BY_NAME";
export const SORT_PRODUCTS_BY_RATING = "SORT_PRODUCTS_BY_RATING";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

export function getProducts() {
  return async function (dispatch) {
    try {
      const productsDb = await axios.get("http://localhost:3001/api/products");

      return dispatch({
        type: GET_PRODUCTS,
        payload: productsDb.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/categories");
    return dispatch({
      type: GET_CATEGORIES,
      payload: json.data.results,
    });
  };
}

export function getProductsById(id) {
  return async (dispatch) => {
    if (id) {
      try {
        const json = await axios.get(
          `http://localhost:3001/api/products/detail/${id}`
        );
        return dispatch({
          type: GET_PRODUCTS_ID,
          payload: json.data.results,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return {
      type: GET_PRODUCTS_ID,
      payload: [],
    };
  };
}
export function getProductsByName(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/api/products?nameProduct=${payload}`
      );
      return dispatch({
        type: GET_PRODUCTS_NAME,
        payload: json.data.results,
      });
    } catch (error) {
      alert("No existe el producto, recarga la pagina");
    }
  };
}

export function sortByName(payload) {
  return function (dispatch) {
    try {
      return dispatch({
        type: SORT_PRODUCTS_BY_NAME,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sortByRating(payload) {
  return function (dispatch) {
    try {
      return dispatch({
        type: SORT_PRODUCTS_BY_RATING,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filters(payload) {
  return async function (dispatch) {
    const json = await axios.get(
      `http://localhost:3001/api/products/filter?categoryName=${payload.category}&price=${payload.price}`
    );
    try {
      return dispatch({
        type: FILTER_PRODUCTS,
        payload: json.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postProduct(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "http://localhost:3001/api/products/createProduct",
      payload
    );

    try {
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}
