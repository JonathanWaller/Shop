import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import storeReducer from "./ducks/storeReducer";

const store = createStore(storeReducer, applyMiddleware(promiseMiddleware()));

export default store;
