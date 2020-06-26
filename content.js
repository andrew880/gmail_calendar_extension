console.log("content start");
//loaded after each website opens
//actionlist
//search for previous notes
//display previous notes
// import {createNoteButton} from 'stickynote.js';
window.menu;
createMenuButton();
loadNotes();
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  enabled = message;
  if (enabled) {
    var div=document.createElement("div");
    document.body.appendChild(div);
    div.innerText="test123";
    // var t = new StickyNote(null, true);
  }
});
function createMenuButton() {
  var menu = document.createElement("ul");
  document.body.appendChild(menu);
  menu.label = "menu"
  var div=document.createElement("button");
  menu.appendChild(div);
  div.innerText="addnote";
  window.menu = menu;
}
