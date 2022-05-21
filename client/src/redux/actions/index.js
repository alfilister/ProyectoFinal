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
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_USERS_REVIEW = "GET_USERS_REVIEW";
export const GET_ORDERS_FROM_DB = "GET_ORDERS_FROM_DB";
export const SET_ORDER_CHECKOUT = "SET_ORDER_CHECKOUT";
export const CONFIRM_ORDER_CHECKOUT = "CONFIRM_ORDER_CHECKOUT";
export const RESET_CART = "RESET_CART";
export const RESET_ORDER = "RESET_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const GET_USERS_BY_EMAIL = "GET_USERS_BY_EMAIL";

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
  return async function () {
    try {
      const json = await axios.post(
        "http://localhost:3001/api/reviews/",
        payload
      );

      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateProduct(product) {
  return async function () {
    const json = await axios.put(
      `http://localhost:3001/api/products/${product.id}`,
      product
    );
    return {
      type: UPDATE_PRODUCT,
      payload: json.data.results,
    };
  };
}

export function getUsersReview() {
  return async function (dispatch) {
    try {
      const user = await axios.get("http://localhost:3001/api/users");

      return dispatch({
        type: GET_USERS_REVIEW,
        payload: user.data.results,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getOrdersFromDb() {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/api/orders`);
    return dispatch({
      type: GET_ORDERS_FROM_DB,
      payload: json.data.results,
    });
  };
}

export function setOrderCheckout(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/api/orders", payload);

    return dispatch({
      type: SET_ORDER_CHECKOUT,
      payload: json.data.results,
    });
  };
}

export function confirmOrderCheckout(id, payload) {
  return async function (dispatch) {
    const json = await axios.put(
      `http://localhost:3001/api/orders/${id}`,
      payload
    );
    return dispatch({
      type: CONFIRM_ORDER_CHECKOUT,
      payload: json.data.results,
    });
  };
}

export function resetCart() {
  return {
    type: RESET_CART,
  };
}

export function resetOrder() {
  return {
    type: RESET_ORDER,
  };
}

export function deleteProduct(idProduct) {
  return async function () {
    const json = await axios.delete(
      `http://localhost:3001/api/products/${idProduct}`
    );
    return {
      type: DELETE_PRODUCT,
      payload: json.data.results,
    };
  };
}

export function createCategory(payload) {
  return async function () {
    const json = await axios.post(
      `http://localhost:3001/api/categories`,
      payload
    );
    return {
      type: CREATE_CATEGORY,
      payload: json.data.results,
    };
  };
}

export function updateOrder(payload) {
	return async function () {
		const json = await axios.put(
			`http://localhost:3001/api/orders/${payload.id}`,
			payload
		);
		return {
			type: UPDATE_ORDER,
			payload: json.data.results,
		};
	};
}

export function getUsersByEmail(emailUser) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/api/users");
      const usuarioFiltrado = data.results.filter(
        (el) => el.email === emailUser
      );

      return dispatch({
        type: GET_USERS_BY_EMAIL,
        payload: usuarioFiltrado,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
// esto fue lo que acabe de hacer Danilo.
export function postUser(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      "http://localhost:3001/api/users/created",
      payload
    );
