// if you want to show initial data :)
const INITIAL_DATA = [
  {
    key: "1",
    todos: "Make dinner"
  },
  {
    key: "2",
    todos: "Finish todo list side project"
  },
  {
    key: "3",
    todos: "Look up SASS doc"
  }
];

import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "../actions/actionsTypes";

const TodoReducer = (state = INITIAL_DATA, action) => {
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
