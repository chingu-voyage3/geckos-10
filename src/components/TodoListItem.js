import React, { Component } from "react";

class TodoListItem extends Component {
  render() {
    return <span className="todoListItem">{this.props.value}</span>;
  }
}

export default TodoListItem;
