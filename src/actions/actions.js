// add todo
export function addTodo(list, value) {
  return {
    type: "ADD_TODO",
    list: list,
    value: value
  };
}

