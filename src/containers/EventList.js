import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/actions";
import Calendar from '../components/Calendar';


function mapStateToProps(state) {
  return {
    events: state.calendarEvents,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const EventList = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default EventList;
