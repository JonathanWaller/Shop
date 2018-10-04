import axios from "axios";

// constants
const GET_SESSIONCART = "GET_SESSIONCART";
// const ADD_TO_CART = "ADD_TO_CART";
// const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// ACTION CREATORS
export function getSessionCart() {
  return {
    type: GET_SESSIONCART,
    payload: axios.get("/api/session")
  };
}

// export function addToCart(id, name, price, img, qty) {
//   return {
//     type: ADD_TO_CART,
//     payload: axios.post("/api/items", {
//       id,
//       name,
//       price,
//       img,
//       qty
//     })
//   };
// }

// export function removeFromCart(id) {
//   return {
//     type: REMOVE_FROM_CART,
//     payload: axios.delete(`/api/item/${id}`)
//   };
// }

// initial state
const initialState = {
  sessionCart: {}
  //   quantity: 1
};

// reducer
export default function sessionCartReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_SESSIONCART}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_SESSIONCART}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        sessionCart: action.payload.data
      };
    // case `${ADD_TO_CART}_FULFILLED`:
    //   return {
    //     ...state,
    //     isLoading: false
    //   };
    // case `${REMOVE_FROM_CART}_FULFILLED`:
    //   return {
    //     ...state,
    //     cart: action.payload.data
    //   };
    default:
      return state;
  }
}
