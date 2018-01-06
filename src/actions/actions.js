// import axios from 'axios';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import React from 'react';


//add event
export function addCalendarEvent(event) {
  return dispatch => {
    console.log(event);
    let eventPost = firebase
      .database()
      .ref(`users/events/${firebase.auth().currentUser.uid}`)
      .push(event);
    let postId = eventPost.key;
    console.log(postId);
    <Redirect to='/calendar' />
  }
}

//remove event
export function removeCalendarEvent(key) {
  console.log('hi from actions');
  return dispatch => firebase.database().ref(`users/events/${firebase.auth().currentUser.uid}`).child(key).remove();
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
