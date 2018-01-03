// import axios from 'axios';
import { dbRefEvents } from '../store/store';



// get events
export const GET_EVENTS = 'GET_EVENTS';
export const getEvents = () => {
  return dispatch => {
    dbRefEvents
      .on('value', snapshot => {
        dispatch({
          type: GET_EVENTS,
          payload: snapshot.val()
        });
      });
  };
}

//add event
export function addCalendarEvent(event) {
  return dispatch => {
    console.log(event);
    dbRefEvents.push(event);
  }
}

//remove event
export function removeCalendarEvent(key) {
  return dispatch => dbRefEvents.child(key).remove();
}

//edit event
export const EDIT_EVENT = 'EDIT_EVENT';
export function editEvent(eventId) {
  return {
    type: EDIT_EVENT,
    eventId,
  }
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
