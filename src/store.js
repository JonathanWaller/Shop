import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import storeReducer from "./ducks/storeReducer";
import cartReducer from "./ducks/cartReducer";
// import sessionCartReducer from "./ducks/sessionCartReducer";

const combinedReducers = combineReducers({
  storeReducer,
  cartReducer
  // sessionCartReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

// const store = createStore(storeReducer, applyMiddleware(promiseMiddleware()));

export default store;
