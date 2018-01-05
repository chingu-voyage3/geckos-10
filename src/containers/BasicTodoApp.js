import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/actions";
import TodoApp from "../components/TodoApp";

const mapStateToProps = state => {
  return {
    todoList: state.todos.todoList, // Not used, but left in for future use
    editingTodoID: state.todos.editingTodoID
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

const BasicTodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

export default BasicTodoApp;
