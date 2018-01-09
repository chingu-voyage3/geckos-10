// import axios from 'axios';
import firebase from 'firebase';

//add event
export function addCalendarEvent(event) {
  firebase
    .database()
    .ref(`users/events/${firebase.auth().currentUser.uid}`)
    .push(event);
}


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
    id: id
  };
}

// move todo
export function moveTodo(target, id) {
  return {
    type: "MOVE_TODO",
    id: id,
    target: target
  };
}

// edit todo
export function editTodo(list, id, newValue) {
  return {
    type: "EDIT_TODO",
    id: id,
    value: newValue
  };
}

export function beginEditTodo(list, id) {
  return {
    type: "BEGIN_EDIT_TODO",
    id: id
  };
}
