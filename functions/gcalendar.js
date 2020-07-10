//
// // Array of API discovery doc URLs for APIs used by the quickstart
// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
//
// // Authorization scopes required by the API; multiple scopes can be
// // included, separated by spaces.
// var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
//
// var authorizeButton = document.getElementById('authorize_button');
// var signoutButton = document.getElementById('signout_button');
//
// /**
//  *  On load, called to load the auth2 library and API client library.
//  */
// function handleClientLoad() {
//   gapi.load('client:auth2', initClient);
// }
//
// /**
//  *  Initializes the API client library and sets up sign-in state
//  *  listeners.
//  */
// function initClient() {
//   gapi.client.init({
//     apiKey: API_KEY,
//     clientId: CLIENT_ID,
//     discoveryDocs: DISCOVERY_DOCS,
//     scope: SCOPES
//   }).then(function () {
//     // Listen for sign-in state changes.
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//
//     // Handle the initial sign-in state.
//     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     authorizeButton.onclick = handleAuthClick;
//     signoutButton.onclick = handleSignoutClick;
//   }, function(error) {
//     appendPre(JSON.stringify(error, null, 2));
//   });
// }
//
// /**
//  *  Called when the signed in status changes, to update the UI
//  *  appropriately. After a sign-in, the API is called.
//  */
// function updateSigninStatus(isSignedIn) {
//   if (isSignedIn) {
//     authorizeButton.style.display = 'none';
//     signoutButton.style.display = 'block';
//     listUpcomingEvents();
//   } else {
//     authorizeButton.style.display = 'block';
//     signoutButton.style.display = 'none';
//   }
// }
//
// /**
//  *  Sign in the user upon button click.
//  */
// function handleAuthClick(event) {
//   gapi.auth2.getAuthInstance().signIn();
// }
//
// /**
//  *  Sign out the user upon button click.
//  */
// function handleSignoutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }
//
// /**
//  * Append a pre element to the body containing the given message
//  * as its text node. Used to display the results of the API call.
//  *
//  * @param {string} message Text to be placed in pre element.
//  */
// function appendPre(message) {
//   var pre = document.getElementById('content');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }
//
// /**
//  * Print the summary and start datetime/date of the next ten events in
//  * the authorized user's calendar. If no events are found an
//  * appropriate message is printed.
//  */
// function listUpcomingEvents() {
//   gapi.client.calendar.events.list({
//     'calendarId': 'primary',
//     'timeMin': (new Date()).toISOString(),
//     'showDeleted': false,
//     'singleEvents': true,
//     'maxResults': 10,
//     'orderBy': 'startTime'
//   }).then(function(response) {
//     var events = response.result.items;
//     appendPre('Upcoming events:');
//
//     if (events.length > 0) {
//       for (i = 0; i < events.length; i++) {
//         var event = events[i];
//         var when = event.start.dateTime;
//         if (!when) {
//           when = event.start.date;
//         }
//         appendPre(event.summary + ' (' + when + ')')
//       }
//     } else {
//       appendPre('No upcoming events found.');
//     }
//   });
// }

function loadcalendar() {
  var calendarContainer = document.createElement("div");
  calendarContainer.id = 'calendar-container';
  calendarContainer.className = 'momo-container';
  var authbtn = document.createElement("button");
  authbtn.id = 'authorize_button';
  var signoutbtn = document.createElement("button");
  signoutbtn.id = 'signout_button';
  calendarContainer.appendChild(authbtn);
  calendarContainer.appendChild(signoutbtn);
  var html = '<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=YWxsaW41QGlsbGlub2lzLmVkdQ&amp;src=aWxsaW5vaXMuZWR1XzI3N210ZXZqbTN0ZnI4NDBtY3JxbW5zcWlvQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X3JmZGFyaDAwcDRjOXBpdjU1ZnJjOTQ0YWRjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X2E3dDc0bmN2NGJzdWFvajg2a3JjbG9oZmowQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X2Nqa2F0bHRpZWs4dDI4YTQwZGJycDUzdGtzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=aWxsaW5vaXMuZWR1X2NnMmxtNWQ0bTRkNDlrcjVxcGhiMWVqNWRjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X2hmcjU1NnFuNjg2cWRzdTVhMGpuMjlicjZzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1XzQycG00aHZtMmdvZGU5NGRqMXRhdjAyMGcwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1XzFnODg2MDVyY3QwZjBoZ3Q4N2huOGFmdmYwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=aWxsaW5vaXMuZWR1X3YyYzQxNXBlMTQ5NzlyNzA5cHVncDM3ZW8wQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5pd3VzaHVAZ21haWwuY29t&amp;color=%2333B679&amp;color=%23D81B60&amp;color=%237CB342&amp;color=%23EF6C00&amp;color=%23616161&amp;color=%2333B679&amp;color=%23AD1457&amp;color=%23C0CA33&amp;color=%23F09300&amp;color=%23F09300&amp;color=%230B8043&amp;color=%23F6BF26&amp;color=%237CB342&amp;showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=1&amp;showTz=1&amp;mode=WEEK" style="border-width:0" width="400" height="600" frameborder="0" scrolling="no"></iframe>'
  //start client
  calendarContainer.innerHTML = html;

  return calendarContainer;
}

function createCalendarButton() {
  stnButtonWrapper = document.createElement('div');
  stnButtonWrapper.className = 'calendar-button-wrapper';
  stnButton = document.createElement('button');
  stnButton.className = 'new-note-button momo-menu-button';
  stnButton.innerHTML = '📅';
  stnButton.addEventListener('click', function(e) {
    chrome.runtime.sendMessage({status: 'display', itemId: 'calendar-container'}, function(response) {
      item = document.getElementById('calendar-container');
      item.style.display = response.display ? 'block' : 'none';
    });
  });
  stnButtonWrapper.appendChild(stnButton);
  return stnButtonWrapper;
}
