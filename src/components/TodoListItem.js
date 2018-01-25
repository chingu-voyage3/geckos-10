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
        <i className="fa fa-pencil" aria-hidden="true" title="Edit" />
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
        <i className="fa fa-times" aria-hidden="true" title="Delete" />
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
        {this.props.displayName === "Not Done"
          ? <i
            className="fa fa-arrow-right"
            aria-hidden="true"
            title="Move Right"
          />
          : <i
            className="fa fa-arrow-left"
            aria-hidden="true"
            title="Move Left"
          />}
      </button>
    );

    return (
      <section className={this.props.addNewTodo ? "editing" : "todoListItem"}>
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
  id: PropTypes.string,
  addNewTodo: PropTypes.bool
};

export default TodoListItem;
