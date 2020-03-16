import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducers from "./reducers";

export const initializeStore = () => {
  return createStore(Reducers, composeWithDevTools(applyMiddleware()));
};
