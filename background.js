console.log("background start")
enabled = true
displayItems = {'notes-container': true, 'calendar-container': true}
window.type = 2
msg = {
  updateNote: {noteChange: {type: window.type}}
}
chrome.browserAction.onClicked.addListener(function (tab) {
  enabled = !enabled;
  chrome.tabs.sendMessage(tab.id, {status: "enable", enabled: enabled, displayItems: displayItems});
})
chrome.tabs.onActivated.addListener(function (activeInfo) {
  //update enabled status after switching tabs
  chrome.tabs.sendMessage(activeInfo.tabId, {status: "enable", enabled: enabled});
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.status == "display") {
    displayItems[message.itemId] = !displayItems[message.itemId];
    sendResponse({display: displayItems[message.itemId]});
  }
});
