import React, { Component } from "react";

import EditTodo from "./AddTodo";

class TodoListItem extends Component {
  render() {
    var commentTxt = !this.props.editing
      ? <span>{this.props.value}</span>
      : <EditTodo {...this.props} />;

    var editBtn = this.props.editing
      ? <button className="btn btn-success">Save</button>
      : <button className="btn btn-primary">{" \u270E"}</button>;

    return (
      <section className="todoListItem">
        {commentTxt}
        {editBtn}
      </section>
    );
  }
}

export default TodoListItem;
