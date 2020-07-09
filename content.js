window.menu = createMenu();
window.menuItems;
window.menuItemsId = loadMenuItems();
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  if (message.status == "enabled") {
    displayUI(message.enabled, message.displayItems);
  }
});

function displayUI(enabled, displayItem) {
  window.menu.style.display = enabled ? "block" : "none";
  menuItemsId.forEach((id, i) => {
    item = document.getElementById(id);
    item.style.display = displayItem[id] ? "block" : "none";
  });
  menuItems.style.display =  enabled ? "block" : "none";
  // noteContainer = document.getElementById(menuItemsId['notesId']);
  // noteContainer.style.display = enabled ? "block" : "none";
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
  items = {}
  //create note button & note comtainer from stickynote.js
  notes = loadNotesContainer();
  menuItems.appendChild(notes);
  items["notes"] = notes.id;
  //create calendar from gcalendar.js
  calendar = loadcalendar();
  menuItems.appendChild(calendar);
  items["calendar"] = calendar.id;

  document.body.appendChild(menuItems);
  window.menuItems = menuItems;
  return items;
}
