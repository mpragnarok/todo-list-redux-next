import { combineReducers } from "redux";
import todos from "./TodoReducer";
import visibilityFilter from "./FilterReducer";
const rootReducer = combineReducers({
  todos,
  visibilityFilter
});

export default rootReducer;
