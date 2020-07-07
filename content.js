window.menu = createMenu();
var menuItemsId = loadMenuItems();
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
function createMenu() {
  var bar = document.createElement("div");
  bar.className = "menu-bar";
  bar.style.width = "12px";
  bar.style.height = "30px";
  bar.style.backgroundColor = "black";
  bar.addEventListener("click", function(e) {
      e.stopPropagation()
  });
  var menu = document.createElement("div");
  menu.label = "menu";
  menu.className = "menu-momo";
  menu.style.top = helpers.pxTOvh(7) + "vh";
  console.log(window.innerWidth);
  menu.style.left = helpers.pxTOvw(window.innerWidth *.77) + "vw";
  menu.style.width = 30 + "px";
  menu.style.height = 30 + "px";
  // var y = document.createElement("div");
  // y.className = "m-p-r m-b";
  // var g = document.createElement("div");
  // g.className = "m-p-r m-r";
  // var N = document.createElement("div");
  // N.className = "m-p-r m-b-r";
  // menu.appendChild(y);
  // menu.appendChild(g);
  // menu.appendChild(N);
  menu.appendChild(bar);
  document.body.appendChild(menu);

  dragElement(menu, bar, null);
  return menu;
}

function loadMenuItems() {
  items = {}
  //create note button & note comtainer
  createNoteButton();
  notesId = loadNotesContainer();
  items["notesId"] = notesId;
  // calenderId = loadCalender();
  // items["calenderId"] = calenderId;
  return items;
}
