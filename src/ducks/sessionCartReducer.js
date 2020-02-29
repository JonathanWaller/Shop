import axios from "axios";

// constants
const GET_SESSIONCART = "GET_SESSIONCART";
// ACTION CREATORS
export function getSessionCart() {
  return {
    type: GET_SESSIONCART,
    payload: axios.get("/api/session")
  };
}

// initial state
const initialState = {
  sessionCart: {}
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
    default:
      return state;
  }
}
