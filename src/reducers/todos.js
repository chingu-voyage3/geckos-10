function todoList(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: action.id, value: action.value }];
    case "EDIT_TODO": {
      let i = state.findIndex(element => {
        return element.id === action.id;
      });
      return [
        ...state.slice(0, i),
        { id: action.id, value: action.value },
        ...state.slice(i + 1)
      ];
    }
    case "REMOVE_TODO": {
      let i = state.findIndex(element => {
        return element.id === action.id;
      });
      return [...state.slice(0, i), ...state.slice(i + 1)];
    }
    default:
      return state;
  }
}

function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    action.id = state.nextTodoID;
  }
  if (state.lists) {
    return {
      ...state,
      lists: Object.assign(
        ...Object.entries(state.lists).map(([key, value]) => {
          if (action.type === "MOVE_TODO") {
            if (key === action.target) {
              return {
                [key]: todoList(value, {
                  type: "ADD_TODO",
                  id: action.id,
                  value: action.value
                })
              };
            } else {
              return {
                [key]: todoList(value, {
                  type: "REMOVE_TODO",
                  id: action.id
                })
              };
            }
          } else {
            if (key === action.list) {
              return { [key]: todoList(value, action) };
            } else {
              return { [key]: value };
            }
          }
        })
      ),
      nextTodoID: action.type === "ADD_TODO" ? action.id + 1 : state.nextTodoID,
      editingTodoID: action.type === "BEGIN_EDIT_TODO" ? action.id : 0
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
