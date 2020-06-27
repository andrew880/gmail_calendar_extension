console.log("background start")
enabled = true
window.type = 2
msg = {
  updateNote: {noteChange: {type: window.type}}
}
chrome.browserAction.onClicked.addListener(function (tab) {
  enabled = !enabled;
  chrome.tabs.sendMessage(tab.id, {status: "enabled", enabled: enabled});
})
chrome.tabs.onActivated.addListener(function (activeInfo) {
  //update enabled status after switching tabs
  chrome.tabs.sendMessage(activeInfo.tabId, {status: "enabled", enabled: enabled});
});
