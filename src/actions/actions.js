// import { firebaseRef } from "../store/store";

// add todo
export function addTodo(list, value) {
  return {
    type: "ADD_TODO",
    list: list,
    value: value
  };
}

// remove todo
export function removeTodo(list, id) {
  return {
    type: "REMOVE_TODO",
    list: list,
    id: id
  };
}

// move todo
export function moveTodo(target, id, value) {
  return {
    type: "MOVE_TODO",
    id: id,
    value: value,
    target: target
  };
}

// edit todo
export function editTodo(list, id, newValue) {
  return {
    type: "EDIT_TODO",
    list: list,
    id: id,
    value: newValue
  };
}

export function beginEditTodo(list, id) {
  return {
    type: "BEGIN_EDIT_TODO",
    list: list,
    id: id
  };
}
