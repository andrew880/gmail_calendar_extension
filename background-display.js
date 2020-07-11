enabled = true
prevTabId = 0;
prevWindowId = 0;
displayItems = {'note-container': true, 'calendar-container': true}
window.type = 2
msg = {
  updateNote: {noteChange: {type: window.type}}
}
chrome.browserAction.onClicked.addListener(function (tab) {
  enabled = !enabled;
  updateDisplay(tab.id);
});
chrome.runtime.onInstalled.addListener(function() {
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  //update enabled status when switching tabs
  updateItemContent(prevTabId, activeInfo.tabId);
  console.log(prevTabId);
  console.log(activeInfo.tabId);
  console.log("__________");
  updateDisplay(activeInfo.tabId);
  prevTabId = activeInfo.tabId
  prevWindowId = activeInfo.windowId;
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.status == "display") {
    displayItems[message.itemId] = !displayItems[message.itemId];
    sendResponse({display: displayItems[message.itemId]});
  }
  if (message.status == "init") {
    displayItems = {};
    for(var key in message.displayItemsId) {
      displayItemsId[message.displayItemsId[key]] = true;
    }
  }
});

function updateDisplay(tabId)  {
  chrome.tabs.sendMessage(tabId, {status: "enable", enabled: enabled, displayItems: displayItems});
}
function updateItemContent(prevTabId, tabId) {
  chrome.tabs.sendMessage(prevTabId, {status: "saveTabContent"});
  chrome.tabs.sendMessage(tabId, {status: "updateTabContent"});
}
