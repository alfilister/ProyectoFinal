import { GET_CATEGORIES, GET_PRODUCTS } from "./constantes";
import axios from "axios";

export function get_products() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/products");

    return dispatch({
      type: GET_PRODUCTS,

      payload: json.data,
    });
  };
}

export function getCategories() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/categories");
    return dispatch({
      type: GET_CATEGORIES,
      payload: json.data,
    });
  };
}
