import React, { Component } from "react";
import PropTypes from "prop-types";

import EditTodo from "./EditiTodo";

class TodoListItem extends Component {
  handleBeginEdit = event => {
    event.preventDefault();
    this.props.beginEditTodo(this.props.displayName, this.props.id);
  };
  handleMove = event => {
    event.preventDefault();
    let target = this.props.displayName === "Not Done" ? "Done" : "Not Done";
    this.props.moveTodo(target, this.props.id, this.props.value);
  };
  handleDelete = event => {
    event.preventDefault();
    this.props.removeTodo(this.props.displayName, this.props.id);
  };
  render() {
    var commentTxt = !this.props.editing
      ? <span>{this.props.value}</span>
      : <EditTodo {...this.props} />;

    var editButton = !this.props.editing
      ? <button
        onClick={this.handleBeginEdit}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          outline: "none"
        }}
      >
        {"\u270E"}
      </button>
      : false;

    var deleteButton = !this.props.editing
      ? <button
        onClick={this.handleDelete}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          outline: "none"
        }}
      >
        {"\u274C"}
      </button>
      : false;

    var moveButton = (
      <button
        onClick={this.handleMove}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          outline: "none",
          float: "right"
        }}
      >
        {this.props.displayName === "Not Done" ? "\u21E8" : "\u21E6"}
      </button>
    );

    return (
      <section className="todoListItem">
        {editButton}
        {commentTxt}
        {deleteButton}
        {!this.props.editing && moveButton}
      </section>
    );
  }
}

TodoListItem.propTypes = {
  displayName: PropTypes.string,
  value: PropTypes.string,
  editing: PropTypes.bool,
  beginEditTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  moveTodo: PropTypes.func,
  id: PropTypes.number
};

export default TodoListItem;
