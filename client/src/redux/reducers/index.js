import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCTS_ID,
  GET_PRODUCTS_NAME,
  SORT_PRODUCTS_BY_NAME,
  SORT_PRODUCTS_BY_RATING
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
    case SORT_PRODUCTS_BY_NAME:
      let sortByName = action.payload === 'a-z'? state.products.sort((a, b)=>{
        if(a.name > b.name){
          return 1
        }
        if(a.name < b.name){
          return -1
        }
        return 0
      }):state.products.sort((a, b)=>{
        if(a.name > b.name){
            return -1
        }
        if(a.name < b.name){
            return 1
        }
        return 0
      })
      return {
        ...state,
        products: sortByName
      }
    case SORT_PRODUCTS_BY_RATING:
      let sortByRating = action.payload === 'asc'? state.products.sort((a, b)=>{
        return b.rating - a.rating;
      }): state.products.sort((a, b)=>{
        return a.rating - b.rating;
      })
      return{
        ...state,
        videogames: sortByRating
      }
    default:
      return state;
  }
}
export default rootReducer;
