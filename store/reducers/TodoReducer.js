// if you want to show initial data :)
const INITIAL_DATA = [
  {
    id: 0,
    text: "Make dinner",
    completed: true
  },
  {
    id: 1,
    text: "Finish todo list side project",
    completed: false
  },
  {
    id: 2,
    text: "Look up SASS doc",
    completed: false
  }
];

import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO
} from "../actions/actionsTypes";

const TodoReducer = (state = INITIAL_DATA, action) => {
  const numIndex = parseInt(action.id);

  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== numIndex);

    case UPDATE_TODO:
      return state.map(todo =>
        todo.id === numIndex ? { ...todo, text: action.text } : todo
      );

    default:
      return state;
  }
};

export default TodoReducer;
