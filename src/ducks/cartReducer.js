import axios from "axios";

// constants
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const EMPTY_CART = "EMPTY_CART";
// ACTION CREATORS
export function getCart() {
  return {
    type: GET_CART,
    payload: axios.get("/api/cart")
  };
}

export function addToCart(id, name, price, img, qty, size) {
  return {
    type: ADD_TO_CART,
    payload: axios.post("/api/items", {
      id,
      name,
      price,
      img,
      qty,
      size
    })
  };
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    payload: axios.delete(`/api/item/${id}`)
  };
}

export function emptyCart(id) {
  return {
    type: EMPTY_CART,
    payload: axios.delete(`/api/emptyCart/${id}`)
  };
}
// initial state
const initialState = {
  cart: [],
  total: 0
  //   quantity: 1
};

// reducer
export default function cartReducer(state = initialState, action) {
  console.log(action);
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
    case `${REMOVE_FROM_CART}_FULFILLED`:
      return {
        ...state,
        cart: action.payload.data
      };
    case `${EMPTY_CART}_FULFILLED`:
      return {
        ...state,
        cart: action.payload.data
      };

    default:
      return state;
  }
}
