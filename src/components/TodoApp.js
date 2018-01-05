import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TodoList from "./TodoList";
import firebase from "firebase";

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }
  componentDidMount() {
    if (firebase.auth().currentUser) {
      var userTodoRef = firebase
        .database()
        .ref("users/todos/" + firebase.auth().currentUser.uid);

      const snapshotToArray = snapshot => {
        let todoArr = [];
        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();

          let todo = {
            id: childSnapshot.key,
            list: item.list,
            value: item.value
          };
          todoArr.push(todo);
        });
        this.setState({
          todos: todoArr
        });
        return todoArr;
      };

      userTodoRef.on("value", snapshot => {
        snapshotToArray(snapshot);
      });
    }
  }
  render() {
    if (!firebase.auth().currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="todoTab">
        <TodoList
          name="not-done"
          displayName="Not Done"
          {...this.props}
          todos={this.state.todos}
        />
        <TodoList
          name="done"
          displayName="Done"
          {...this.props}
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default TodoApp;
