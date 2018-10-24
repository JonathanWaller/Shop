import axios from "axios";

// constants
const GET_STORE = "GET_STORE";
const GET_CATEGORY = "GET_CATEGORY";

// ACTION CREATORS
export function getStore() {
  return {
    type: GET_STORE,
    payload: axios.get("/api/store")
  };
}

export function getCategory(id) {
  return {
    type: GET_CATEGORY,
    payload: axios.get(`/api/category/${id}`)
  };
}

// initial state
const initialState = {
  items: []
};

// reducer
export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_STORE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_STORE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data
      };
    case `${GET_CATEGORY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_CATEGORY}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        items: action.payload.data
      };
    default:
      return state;
  }
}
