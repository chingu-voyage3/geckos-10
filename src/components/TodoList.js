import React, { Component } from "react";
import PropTypes from "prop-types";

import TodoListItem from "./TodoListItem";

class TodoList extends Component {
  render() {
    return (
      <div className="todoList">
        <header>{this.props.displayName}</header>
        {this.props.todos.map((todo) => {
          if (todo.list === this.props.displayName) {
            return (
              <TodoListItem
                key={todo.id}
                editing={this.props.editingTodoID === todo.id}
                {...todo}
                {...this.props}
              />
            );
          }
          return false;
        })}
        <TodoListItem editing addNewTodo {...this.props} />
      </div>
    );
  }
}

TodoList.propTypes = {
  displayName: PropTypes.string,
  lists: PropTypes.object,
  editingTodoID: PropTypes.string,
  todos: PropTypes.array,
};

export default TodoList;
