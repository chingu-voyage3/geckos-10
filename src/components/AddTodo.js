import React, { Component } from "react";

class AddTodo extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.addTodo(this.props.displayName, this.input.value);
    this.input.value = "";
  };

  render() {
    return (
      <div className="todoListItem">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            ref={input => (this.input = input)}
            placeholder="Test Value"
          />
          <input type="submit" hidden />
        </form>
      </div>
    );
  }
}

export default AddTodo;
