console.log("content start");
//loaded after each website opens
//actionlist
//search for previous notes
//display previous notes

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  enabled = message;
  if (enabled) {
    var div=document.createElement("div");
    document.body.appendChild(div);
    div.innerText="test123";
    // var t = new StickyNote(null, true);
  }
});
