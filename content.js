window.menu = createMenu();
window.menuItemsId, window.menuItems = loadMenuItems();
// initClient();
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  if (message.status == "enable") {
    displayUI(message.enabled, message.displayItems);
  }
  //when tab is unloaded
  //store currrent data into localstorage to ensure sync across tabs
  if (message.status == "saveTabContent") {
    storeItemContent();
  }
  if (message.status == "updateTabContent") {
    console.log(updateItemContent());
  }
});

function displayUI(enabled, displayItem) {
  window.menu.style.display = enabled ? "block" : "none";
  window.menuItems.style.display =  enabled ? "block" : "none";
  for(var key in window.menuItemsId) {
    item = document.getElementById(window.menuItemsId[key]);
    item.style.display = displayItem[window.menuItemsId[key]] ? "block" : "none";
  }
}
function storeItemContent() {
  storeNoteContent();
}
function updateItemContent() {
  updateNoteContent();
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
  menu.style.left = helpers.pxTOvw(window.innerWidth *.77) + "vw";
  menu.style.width = 30 + "px";
  menu.style.height = 30 + "px";
  menu.appendChild(bar);
  document.body.appendChild(menu);
  dragElement(menu, bar, null);

  //add note, calendar button
  menu.appendChild(createNoteButton());
  menu.appendChild(createCalendarButton());

  return menu;
}

function loadMenuItems() {
  menuItems = document.createElement("div");
  menuItems.id = "menu-items-container";
  menuItemsId = {}
  //create note button & note comtainer from stickynote.js
  notes = loadNotesContainer();
  menuItems.appendChild(notes);
  menuItemsId["notes"] = notes.id;
  //create calendar from gcalendar.js
  calendar = loadcalendar();
  menuItems.appendChild(calendar);
  menuItemsId["calendar"] = calendar.id;

  document.body.appendChild(menuItems);
  return menuItemsId, menuItems;
}
