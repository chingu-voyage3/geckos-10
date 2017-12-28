import React, { Component } from "react";

import TodoListItem from "./TodoListItem";
import EditTodo from "./AddTodo";

class TodoList extends Component {
  render() {
    return (
      <div className="todoList">
        <header>{this.props.displayName}</header>
        {this.props.lists[this.props.displayName].map((todo, index) =>
          <TodoListItem key={index} {...todo} {...this.props} />
        )}
        <EditTodo {...this.props} />
        <EditTodo
          value="Add"
          onClick={() => {
            this.props.addTodo(this.props.displayName, "testing testing");
          }}
        />
      </div>
    );
  }
}

export default TodoList;
