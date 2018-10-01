import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import storeReducer from "./ducks/storeReducer";
import cartReducer from "./ducks/cartReducer";

const combinedReducers = combineReducers({
  storeReducer,
  cartReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

// const store = createStore(storeReducer, applyMiddleware(promiseMiddleware()));

export default store;
