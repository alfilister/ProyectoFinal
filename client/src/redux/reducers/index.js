import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCTS_ID,
  GET_PRODUCTS_NAME,
  SORT_PRODUCTS_BY_NAME,
  SORT_PRODUCTS_BY_RATING,
  FILTER_PRODUCTS,
  CLEAR_DETAIL,
  GET_USER_BY_ID,
  GET_REVIEWS_PRODUCT,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_CATEGORY,
  SET_ORDER_CHECKOUT,
  GET_ORDERS_FROM_DB,
  CONFIRM_ORDER_CHECKOUT,
  GET_USERS_REVIEW,
  RESET_CART,
  RESET_ORDER,
  GET_USERS_BY_EMAIL,

   GET_ALL_USERS,
  ADD_ITEM_TO_CART_STORAGE,
  REMOVE_ITEM_TO_CART_STORAGE,
  ADD_COUNTER_LOCAL_STORAGE,
  FIRST_SET_COUNT,
  POST_USER,
} from "../actions";

const initialState = {
  products: [],
  copyProducts: [],
  categories: [],
  productsDetail: [],
  featProducts: [],
  suggestedRandom: [],
  allUsers : [],
  user: {},
  reviewProduct: [],
  cart: window.localStorage.getItem("cartCounter")
    ? JSON.parse(localStorage.getItem("cartCounter"))
    : [],
	cartCounter: "", //Antes era un 0
	ordersDb: [],
	orderSent: {},
	userEmailId: {},
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			var featuredFilter = action.payload.filter((el) => el.featured === true);

			function randomIntFromInterval(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min);
			}

			const chargeSuggest = () =>
				featuredFilter[0]
					? featuredFilter[randomIntFromInterval(0, featuredFilter.length - 1)]
					: action.payload[randomIntFromInterval(0, action.payload.length - 1)];

			return {
				...state,
				products: action.payload,
				copyProducts: action.payload,
				featProducts: featuredFilter,
				suggestedRandom: [chargeSuggest()],
			};

		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case GET_PRODUCTS_NAME:
			return {
				...state,
				products: action.payload,
			};
		case GET_PRODUCTS_ID:
			return {
				...state,
				productsDetail: action.payload,
			};
		case SORT_PRODUCTS_BY_NAME:
			let sortByName =
				action.payload === "a-z"
					? state.products.sort((a, b) => {
							if (a.name.toLowerCase() > b.name.toLowerCase()) {
								return 1;
							}
							if (a.name.toLowerCase() < b.name.toLowerCase()) {
								return -1;
							}
							return 0;
					  })
					: state.products.sort((a, b) => {
							if (a.name.toLowerCase() > b.name.toLowerCase()) {
								return -1;
							}
							if (a.name.toLowerCase() < b.name.toLowerCase()) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				products: sortByName,
			};
		case SORT_PRODUCTS_BY_RATING:
			let sortByRating =
				action.payload === "asc"
					? state.products.sort((a, b) => {
							return b.rating - a.rating;
					  })
					: state.products.sort((a, b) => {
							return a.rating - b.rating;
					  });
			return {
				...state,
				products: sortByRating,
			};
		case FILTER_PRODUCTS:
			return {
				...state,
				products: action.payload,
			};
		case "POST_PRODUCT":
			return {
				...state,
			};

		case CLEAR_DETAIL:
			return {
				...state,
				productsDetail: [],
			};
		case GET_REVIEWS_PRODUCT:
			return {
				...state,
				reviewProduct: action.payload,
			};

		case ADD_ITEM_TO_CART:
			const product = state.copyProducts;
			const validation = state.cart.filter((e) => e.id === action.payload);
			if (validation[0]) {
				if (validation[0].product.stock > validation[0].quantity) {
					validation[0].quantity++;

					return {
						...state,
						cartCounter: ++state.cartCounter,
					};
				} else {
					alert("There is no available stock for this item");
					return { ...state };
				}
			} else {
				const result = product.filter((el) => el.id === action.payload)[0];

				return {
					...state,
					cart: [
						...state.cart,
						{ quantity: 1, id: result.id, product: result },
					],
					cartCounter: ++state.cartCounter,
				};
			}
		case ADD_ITEM_TO_CART_STORAGE:
			window.localStorage.setItem("cartCounter", JSON.stringify(state.cart));
			return { ...state };

		case REMOVE_ITEM_FROM_CART:
			const itemToremove = state.cart.filter(
				(el) => el.id === action.payload
			)[0];
      if (itemToremove.quantity > 0) {
        itemToremove.quantity--;
        return { ...state, cartCounter: --state.cartCounter };
      } else {
        return {
          ...state,
        };
      }

      case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case REMOVE_ITEM_TO_CART_STORAGE:
      window.localStorage.setItem("cartCounter", JSON.stringify(state.cart));
      return {
        ...state,
      };
    case ADD_COUNTER_LOCAL_STORAGE:
      // localStorage.removeItem("contador");
      window.localStorage.setItem(
        "contador",
        JSON.stringify(state.cartCounter)
      );

			return {
				...state,
			};
		case FIRST_SET_COUNT:
			const constResolve = window.localStorage.getItem("contador");
			return {
				...state,
				cartCounter: constResolve,
			};

		case GET_USER_BY_ID:
			return {
				...state,
				user: action.payload,
			};
		case UPDATE_PRODUCT:
			return {
				...state,
			};
		case DELETE_PRODUCT:
			return {
				...state,
			};
		case CREATE_CATEGORY:
			return {
				...state,
				categories: [...state.categories, action.payload[0]],
			};
		case GET_USERS_REVIEW:
			const usersFilterNameId = action.payload.map((el) => {
				return { id: el.id, fullName: el.fullName };
			});
			return {
				...state,
				usersReview: usersFilterNameId,
			};

		case GET_ORDERS_FROM_DB:
			return {
				...state,
				ordersDb: action.payload,
			};

		case SET_ORDER_CHECKOUT:
			return {
				...state,
				orderSent: action.payload,
			};

		case CONFIRM_ORDER_CHECKOUT:
			return {
				...state,
				orderSent: action.payload,
			};

		case RESET_CART:
			return {
				...state,
				cart: [],
				cartCounter: "",
			};

		case RESET_ORDER:
			return {
				...state,
				orderSent: {},
			};

		case GET_USERS_BY_EMAIL:
			return {
				...state,
				userEmailId: action.payload,
			};
    case POST_USER:
      return {
        ...state,
        userEmailId: action.payload,
      };
      
      case 'UPDATE_USER':
      return {
        ...state,
      };

    //return { ...state }
    default:
      return state;
  }
}
export default rootReducer;
