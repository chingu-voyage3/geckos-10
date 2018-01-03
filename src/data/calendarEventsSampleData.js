const calendarEvents = [{
  'title': 'Test',
  'allDay': true,
  'start': new Date(2018, 1, 1),
  'end': new Date(2018, 1, 3),
  'description': 'Does this work?',
},
{
  'title': 'Hello',
  'allDay': true,
  'start': new Date(2018, 2, 1),
  'end': new Date(2018, 2, 3),
  'description': 'Does this work?',
},
{
  'title': 'Test 2',
  'allDay': true,
  'start': new Date(2018, 1, 5),
  'end': new Date(2018, 1, 5),
  'description': 'Sample 2',
},
{
  'title': 'Test 3',
  'allDay': false,
  'start': new Date('January 1, 2018,  11: 00: 00'),
  'end': new Date('January 1, 2018, 12: 00: 00'),
  'description': 'Sample 2',
},
];

export default calendarEvents;