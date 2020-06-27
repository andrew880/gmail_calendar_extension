window.menu;
createMenuButton();
noteContainerId = loadNotes();
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  if (message.status == "enabled")
    enableUI(message.enabled);
});

function enableUI(enabled) {
  window.menu.style.display = enabled ? "block" : "none";
  noteContainer = document.getElementById(noteContainerId);
  noteContainer.style.display = enabled ? "block" : "none";
}
function createMenuButton() {
  var menu = document.createElement("ul");
  document.body.appendChild(menu);
  menu.label = "menu"

  window.menu = menu;
}
// var menu = function() {
//   var
// }
