import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCTS_ID,
  GET_PRODUCTS_NAME,
} from "../actions";

const initialState = {
  products: [],
  copyProducts: [],
  categories: [],
  productsDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        copyProducts: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_PRODUCTS_NAME:
      return {
        ...state,
        products: [action.payload],
      };
    case GET_PRODUCTS_ID:
      return {
        ...state,
        productsDetail: [action.payload],
      };

    default:
      return state;
  }
}
export default rootReducer;
