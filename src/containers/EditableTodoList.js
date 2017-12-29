import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/actions";
import TodoList from "../components/TodoList";

const mapStateToProps = state => {
  return {
    lists: state.todos.lists,
    nextTodoID: state.todos.nextTodoID,
    editingTodoID: state.todos.editingTodoID
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

const EditableTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default EditableTodoList;
