import axios from "axios";

// constants
const GET_PRODUCT = "GET_PRODUCT";

// ACTION CREATORS
export function getProduct(id) {
  return {
    type: GET_PRODUCT,
    payload: axios.get(`/api/product/${id}`)
  };
}

// initial state
const initialState = {
  product: []
};

// reducer
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PRODUCT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PRODUCT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        product: action.payload.data
      };
    default:
      return state;
  }
}
