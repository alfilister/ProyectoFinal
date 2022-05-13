import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PRODUCTS_ID = "GET_PRODUCTS_ID";
export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";

export function get_products() {
  return async function (dispatch) {
    try {
      await axios.get("http://localhost:3001/api/categories");
      await axios.get("http://localhost:3001/api/products");
      const productsDb = await axios.get(
        "http://localhost:3001/api/products/info"
      );

      return dispatch({
        type: GET_PRODUCTS,
        payload: productsDb.data.data,
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

      payload: json.data,
    });
  };
}

export function getProductsById(id) {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/api/products/${id}`);
      return dispatch({
        type: GET_PRODUCTS_ID,
        payload: json.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getProductsByName(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/api/products/info?name=${payload}`
      );
      return dispatch({
        type: GET_PRODUCTS_NAME,
        payload: json.data.data,
      });
    } catch (error) {
      alert("No existe el producto, recarga la pagina");
    }
  };
}
