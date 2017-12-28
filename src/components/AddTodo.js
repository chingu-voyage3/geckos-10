import React, { Component } from "react";

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.value = props.value;
  }
  handleSubmit = event => {
    event.preventDefault();
    if (this.props.editing) {
      this.props.editTodo(
        this.props.displayName,
        this.props.id,
        this.input.value
      );
    } else {
      this.props.addTodo(this.props.displayName, this.input.value);
    }
  };

  componentDidMount = () => {
    this.input.value = this.props.value;
  };

  render() {
    return (
      <div className="todoListItem">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            ref={input => (this.input = input)}
            onBlur={this.handleSubmit}
          />
          <input type="submit" hidden />
        </form>
      </div>
    );
  }
}

export default EditTodo;
