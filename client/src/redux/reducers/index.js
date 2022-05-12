import { GET_CATEGORIES, GET_PRODUCTS } from "../actions/constantes";

const initialState = {
  products: [],
  copyProducts: [],
  categories: [],
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

    default:
      return state;
  }
}
export default rootReducer;
