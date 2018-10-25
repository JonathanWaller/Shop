import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import storeReducer from "./ducks/storeReducer";
import cartReducer from "./ducks/cartReducer";
import productReducer from "./ducks/productReducer";

const combinedReducers = combineReducers({
  storeReducer,
  cartReducer,
  productReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

export default store;
