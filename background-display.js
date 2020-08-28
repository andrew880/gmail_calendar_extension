enabled = true
prevTabId = 0;
prevWindowId = 0;
displayItems = {'items': {'note-container': true, 'calendar-container': true, 'sideboard-container': false},
                'sideboard': {'note-container': false, 'calendar-container': false, 'sideboard-container': true},
                'stored': {'note-container': true, 'calendar-container': true, 'sideboard-container': false}};//temp: stored
currDisplay = 'items';
//updates
chrome.browserAction.onClicked.addListener(function (tab) {
  enabled = !enabled;
  updateDisplay(tab.id);
});
chrome.runtime.onInstalled.addListener(function() {
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  //update enabled status when switching tabs
  updateItemContent(prevTabId, activeInfo.tabId);
  updateDisplay(activeInfo.tabId);
  prevTabId = activeInfo.tabId
  prevWindowId = activeInfo.windowId;
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.status) {
    case "display":
      displayItems[currDisplay][message.itemId] = !displayItems[currDisplay][message.itemId];
      sendResponse({display: displayItems[currDisplay][message.itemId]});
      break;
    case "init":
      displayItems = {};
      for(var key in message.displayItemsId) {
        displayItemsId[message.displayItemsId[key]] = true;
      }
      break;
    case "displayUI":
      sendResponse({enabled:enabled, displayItems:displayItems[currDisplay]});
      break;
    case "displayStyle":
      currDisplay = currDisplay == 'sideboard' ? 'items' : 'sideboard';
      sendResponse({display: currDisplay == 'sideboard', enabled: enabled, displayItems: displayItems[currDisplay]});
      break;
    case "displayOnlyUpdate":
      for (var key in displayItems[currDisplay]) {
        displayItems[currDisplay][key] = false;
      }
      for (var i in message.itemsId) {
        displayItems[currDisplay][message.itemsId[i]] = true;
      }
    //otherwise fall through
  }
});

function updateDisplay(tabId)  {
  chrome.tabs.sendMessage(tabId, {status: "enable", enabled: enabled, displayItems: displayItems[currDisplay]});
}
function updateItemContent(prevTabId, tabId) {
  chrome.tabs.sendMessage(prevTabId, {status: "saveTabContent"});
  chrome.tabs.sendMessage(tabId, {status: "updateTabContent"});
}
