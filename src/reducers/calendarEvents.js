// import firebase from 'firebase';

// function calendarEvents(state = [], action) {
//   switch (action.type) {
//     case "ADD_EVENT": {
//       let event = { value: action.value, event: action.event };
//       console.log(event);
//       const eventRef = firebase
//         .database()
//         .ref(`users/${firebase.auth().currentUser.uid}/events/`)
//         .push();
//       // eventRef.set(event);
//       return [...state, event];
//     }
//       return state;
//     default:
//   }
// }


// function calendarEventsReducer(state = [], action) {
//   return {
//     events: calendarEvents(state.calendarEvents, action),
//   };
// }

// export default calendarEventsReducer;