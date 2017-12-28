function todoList(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: state.nextTodoID, value: action.value }];
    case "EDIT_TODO":
      var i = state.findIndex((element) => { return element.id === action.id});
      return [...state.slice(0, i),
          { id: action.id, value: action.value },
          ...state.slice(i + 1)
      ];
    case "REMOVE_TODO":
      return state;
    default:
      return state;
  }
}

function todos(state = [], action) {
  if (state.lists) {
    return {
      ...state,
      lists: Object.assign(
        ...Object.entries(state.lists).map(([key, value]) => {
          if (key === action.list) {
            return { [key]: todoList(value, action) };
          } else {
            return { [key]: value };
          }
        })
      )
    };
  }
  return state;
}

export function todoAppReducer(state = [], action) {
  return {
    nextTodoID: state.nextTodoID,
    lists: todos(state.lists, action)
  };
}

export default todos;
