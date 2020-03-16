import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducers from "./reducers";

// initial data
// const INITIAL_DATA = [
//   {
//     id: 0,
//     text: 'Walk the Dog'
//   },
//   {
//     id: 1,
//     text: 'Learn Redux'
//   }
// ]

export const initializeStore = () => {
  return createStore(Reducers, composeWithDevTools(applyMiddleware()));
};
