import React, { Component } from "react";
import PropTypes from "prop-types";

import TodoListItem from "./TodoListItem";

class TodoList extends Component {
  render() {
    return (
      <div className="todoList">
        <header>{this.props.displayName}</header>
        {this.props.lists[this.props.displayName].map((todo, index) => {
          return (
            <TodoListItem
              key={index}
              editing={this.props.editingTodoID === todo.id}
              {...todo}
              {...this.props}
            />
          );
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
};

export default TodoList;
