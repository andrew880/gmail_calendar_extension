console.log("background start")
//addListener bor button
window.enabled = false
window.type = 2
msg = {
  updateNote: {noteChange: {type: window.type}}
}
localStorage["enable_note"] = true
chrome.browserAction.onClicked.addListener(function (tab) {
  //if set true -> run function
  window.enabled = !window.enabled
  msg = {
    updateNote: {noteChange: {type:1}},
  }
  chrome.tabs.sendMessage(tab.id, window.enabled);
  localStorage["enable"] = window.enabled;
})
