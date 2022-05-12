import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";

export function get_products() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/products");
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
}

export function getCategories() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/categories");
    return dispatch({
      type: GET_CATEGORIES,
      payload: json.data,
    });
  };
}
