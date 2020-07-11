
function loadcalendar() {
  var calendarContainer = document.createElement("div");
  calendarContainer.id = 'calendar-container';
  calendarContainer.className = 'momo-container';
  var containerBar = document.createElement("div");
  containerBar.className = 'momo-containerBar';
  var html = '<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=YWxsaW41QGlsbGlub2lzLmVkdQ&amp;src=aWxsaW5vaXMuZWR1XzI3N210ZXZqbTN0ZnI4NDBtY3JxbW5zcWlvQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X3JmZGFyaDAwcDRjOXBpdjU1ZnJjOTQ0YWRjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X2E3dDc0bmN2NGJzdWFvajg2a3JjbG9oZmowQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X2Nqa2F0bHRpZWs4dDI4YTQwZGJycDUzdGtzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=aWxsaW5vaXMuZWR1X2NnMmxtNWQ0bTRkNDlrcjVxcGhiMWVqNWRjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1X2hmcjU1NnFuNjg2cWRzdTVhMGpuMjlicjZzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1XzQycG00aHZtMmdvZGU5NGRqMXRhdjAyMGcwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5vaXMuZWR1XzFnODg2MDVyY3QwZjBoZ3Q4N2huOGFmdmYwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=aWxsaW5vaXMuZWR1X3YyYzQxNXBlMTQ5NzlyNzA5cHVncDM3ZW8wQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;src=aWxsaW5pd3VzaHVAZ21haWwuY29t&amp;color=%2333B679&amp;color=%23D81B60&amp;color=%237CB342&amp;color=%23EF6C00&amp;color=%23616161&amp;color=%2333B679&amp;color=%23AD1457&amp;color=%23C0CA33&amp;color=%23F09300&amp;color=%23F09300&amp;color=%230B8043&amp;color=%23F6BF26&amp;color=%237CB342&amp;showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=1&amp;showTz=1&amp;mode=WEEK" style="border-width:0" width="400" height="600" frameborder="0" scrolling="no"></iframe>'
  //start client
  calendarContainer.innerHTML = html;
  calendarContainer.appendChild(containerBar);
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
