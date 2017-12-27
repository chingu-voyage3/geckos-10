import React, { Component } from "react";
import EditableTodoList from "../containers/EditableTodoList";

class TodoApp extends Component {
  render() {
    return (
      <div className="todoTab">
        <EditableTodoList name="not-done" displayName="Not Done" />
        <EditableTodoList name="done" displayName="Done" />
      </div>
    );
  }
}

export default TodoApp;
