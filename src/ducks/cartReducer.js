import axios from "axios";

// constants
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
// ACTION CREATORS
export function getCart() {
  return {
    type: GET_CART,
    payload: axios.get("/api/cart")
  };
}

export function addToCart(
  product_id,
  product_name,
  product_price,
  product_img
) {
  return {
    type: ADD_TO_CART,
    payload: axios.post("/api/items", {
      product_id,
      product_name,
      product_price,
      product_img
    })
  };
}

// initial state
const initialState = {
  cart: []
};

// reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_CART}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_CART}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        cart: action.payload.data
      };
    case `${ADD_TO_CART}_FULFILLED`:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
