import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TodoList from "./TodoList";

class TodoApp extends Component {
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
        />
        <TodoList
          name="done"
          displayName="Done"
          {...this.props}
        />
      </div>
    );
  }
}

export default TodoApp;
