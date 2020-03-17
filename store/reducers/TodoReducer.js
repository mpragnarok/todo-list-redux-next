// if you want to show initial data :)
const INITIAL_DATA = [
  {
    key: 0,
    todos: "Make dinner",
    completed: false
  },
  {
    key: 1,
    todos: "Finish todo list side project",
    completed: false
  },
  {
    key: 2,
    todos: "Look up SASS doc",
    completed: false
  }
];

import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "../actions/actionsTypes";

const TodoReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          key: action.id,
          todos: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action ? { ...todo, completed: !todo.completed } : todo
      );

    case REMOVE_TODO:
      const numIndex = parseInt(action.id);
      return state.filter(todo => todo.id !== numIndex);

    default:
      return state;
  }
};

export default TodoReducer;
