//initialize at tab load
window.menu = createMenu();
window.menuItemsId, window.menuItems = loadMenuItems();
chrome.runtime.sendMessage({status: "displayUI"}, function(response) {
  displayUI(response.enabled, response.displayItems);
});
//updaes
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch(message.status) {
    case "enable":
      displayUI(message.enabled, message.displayItems);
      break;
    case "saveTabContent":
      storeItemContent();
      break;
    case "updateTabContent":
      updateItemContent();
      break;
    //otherwise fall through
  }
});
//functions
function displayUI(enabled, displayItems) {
  window.menu.style.display = enabled ? "block" : "none";
  container = document.getElementById("menu-items-container");
  container.style.display = enabled ? "block" : "none";
  //update items status interaction with others
  enableSideboard(enabled && displayItems["sideboard-container"]);
  //when enabled show/hide items
  for(var key in window.menuItemsId) {
    item = document.getElementById(window.menuItemsId[key]);
    item.style.display = displayItems[window.menuItemsId[key]] ? "block" : "none";
  }
}
function storeItemContent() {
  storeNoteContent();
  //todo: other items
}
function updateItemContent() {
  updateNoteContent();
  //todo: other items
}
function createMenu() {
  var bar = document.createElement("div");
  bar.className = "menu-bar";
  bar.addEventListener("click", function(e) {
      e.stopPropagation()
  });
  var menu = document.createElement("div");
  menu.label = "menu";
  menu.className = "menu-momo";
  menu.appendChild(bar);
  document.body.appendChild(menu);
  dragElement(menu, bar, null);

  menu.appendChild(createNoteButton());
  menu.appendChild(createCalendarButton());
  menu.appendChild(createSidebaordButton());
  return menu;
}
function loadMenuItems() {
  menuItems = document.createElement("div");
  menuItems.id = "menu-items-container";
  menuItemsId = {}
  //create note comtainer from stickynote.js
  notes = loadNotesContainer();
  menuItems.appendChild(notes);
  menuItemsId["notes"] = notes.id;
  //create calendar from gcalendar.js
  calendar = loadCalendar();
  menuItems.appendChild(calendar);
  menuItemsId["calendar"] = calendar.id;
  //create sideboard
  sideboard = loadSideboard();
  menuItems.appendChild(sideboard);
  menuItemsId["sideboard"] = sideboard.id;
  document.body.appendChild(menuItems);
  return menuItemsId, menuItems;
}
