function todoList(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: state.nextTodoID, value: action.value }];
      break;
    case "EDIT_TODO":
      return [...state];
      //return Object.assign({}, ...state, {
      //  items: {
      //    ...state.items,
      //    [action.todoID]: todoList(state.items[action.todoID], action)
      //  }
      //});
      //var i = 0;
      //return Object.assign({}, ...state, {
      //  items: [
      //    ...state.items.slice(0, i),
      //    { ...state.items[i], value: action.value },
      //    ...state.items.slice(i + 1)
      //  ]
      //});
      break;
    case "REMOVE_TODO":
      return state;
      break;
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
          if (key == action.list) {
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

function todoApp(state = [], action) {
  return {
    nextTodoID: state.nextTodoID,
    lists: todos(state.lists, action)
  };
}

export default todos;
