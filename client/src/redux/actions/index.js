import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PRODUCTS_ID = "GET_PRODUCTS_ID";
export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";
export const SORT_PRODUCTS_BY_NAME = "SORT_PRODUCTS_BY_NAME";
export const SORT_PRODUCTS_BY_RATING = "SORT_PRODUCTS_BY_RATING";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_REVIEWS_PRODUCT = "GET_REVIEWS_PRODUCT";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";

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
    const json = await axios.get("http://localhost:3001/api/categories");
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
      `http://localhost:3001/api/products/filter?categoryName=${payload.category}&min=${payload.min}&max=${payload.max}`
    );
    try {
      return dispatch({
        type: FILTER_PRODUCTS,
        payload: json.data.data,
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

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export function getReviewsProduct(payload) {
  return async function (dispatch) {
    try {
      const users = await axios.get("http://localhost:3001/api/users");
      const { data } = await axios.get(
        "http://localhost:3001/api/reviews/product"
      );

      return dispatch({
        type: GET_REVIEWS_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addItemToCart(payload) {
  return {
    type: ADD_ITEM_TO_CART,
    payload: payload,
  };
}

export function removeItemFromCart(payload) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: payload,
  };
}

export function getUserById(idUser) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/api/users/${idUser}`);
    return dispatch({
      type: GET_USER_BY_ID,
      payload: json.data.results,
    });
  };
}

export function postReview(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "http://localhost:3001/api/reviews/",
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

export function postUser(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "http://localhost:3001/api/users/created",payload);

    try {
      //posible bug que hace que se repita cada peticion htpp debe ser en la configuracion de cada  routa cuando entra a localhost:3001/.../...  y asi en varias peticiones htpp
      console.log('soy la accion y esto me llego del front ' ,json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

