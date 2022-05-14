import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCTS_ID,
  GET_PRODUCTS_NAME,
  SORT_PRODUCTS_BY_NAME,
  SORT_PRODUCTS_BY_RATING,
  FILTER_PRODUCTS,
} from "../actions"

const initialState = {
  products: [],
  copyProducts: [],
  categories: [],
  productsDetail: [],
  featProducts: [],
  suggestedRandom: {},
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      var featuredFilter = action.payload.filter((el) => el.featured === true)

      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      const chargeSuggest = () =>
        featuredFilter[0]
          ? featuredFilter[randomIntFromInterval(0, featuredFilter.length - 1)]
          : action.payload[randomIntFromInterval(0, action.payload.length - 1)]

      return {
        ...state,
        products: action.payload,
        copyProducts: action.payload,
        featProducts: featuredFilter,
        suggestedRandom: chargeSuggest(),
      }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
    case GET_PRODUCTS_NAME:
      return {
        ...state,
        products: action.payload,
      }
    case GET_PRODUCTS_ID:
      return {
        ...state,
        productsDetail: action.payload,
      }
    case SORT_PRODUCTS_BY_NAME:
      let sortByName =
        action.payload === "a-z"
          ? state.products.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
              }
              return 0
            })
          : state.products.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1
              }
              return 0
            })
      return {
        ...state,
        products: sortByName,
      }
    case SORT_PRODUCTS_BY_RATING:
      let sortByRating =
        action.payload === "asc"
          ? state.products.sort((a, b) => {
              return b.rating - a.rating
            })
          : state.products.sort((a, b) => {
              return a.rating - b.rating
            })
      return {
        ...state,
        products: sortByRating,
      }
    case FILTER_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case "POST_PRODUCT":
      return {
        ...state,
      }

    default:
      return state
  }
}
export default rootReducer
