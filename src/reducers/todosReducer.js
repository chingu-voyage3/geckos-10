import firebase from "firebase";

function todoList(state = [], action) {
  switch (action.type) {
    case "MOVE_TODO": {
      let i = state.findIndex(element => {
        return element.id === action.id;
      });
      let todo = Object.assign({}, state[i]);
      todo.list = action.target;
      const todoRef = firebase
        .database()
        .ref(
        "users/todos/" + firebase.auth().currentUser.uid + "/" + action.id
        );
      todoRef.update({ list: action.target });
      return [...state.slice(0, i), todo, ...state.slice(i + 1)];
    }
    case "ADD_TODO": {
      let todo = { value: action.value, list: action.list };
      const todoRef = firebase
        .database()
        .ref("users/todos/" + firebase.auth().currentUser.uid)
        .push();
      todoRef.set(todo);
      return [...state, todo];
    }
    case "EDIT_TODO": {
      let i = state.findIndex(element => {
        return element.id === action.id;
      });
      let todo = Object.assign({}, state[i]);
      todo.value = action.value;
      const todoRef = firebase
        .database()
        .ref(
        "users/todos/" + firebase.auth().currentUser.uid + "/" + action.id
        );
      todoRef.update({ value: action.value });
      return [...state.slice(0, i), todo, ...state.slice(i + 1)];
    }
    case "REMOVE_TODO": {
      let i = state.findIndex(element => {
        return element.id === action.id;
      });
      const todoRef = firebase
        .database()
        .ref(
        "users/todos/" + firebase.auth().currentUser.uid + "/" + action.id
        );
      todoRef.remove();
      return [...state.slice(0, i), ...state.slice(i + 1)];
    }
    default:
      return state;
  }
}

function todoAppReducer(state = [], action) {
  return {
    todoList: todoList(state.todoList, action), // Not used, but left in for future use
    editingTodoID: action.type === "BEGIN_EDIT_TODO" ? action.id : "0"
  };
}

export default todoAppReducer;
