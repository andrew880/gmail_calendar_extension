document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('button'),addEventListener('click', onclick, false)

  fuction onclick() {
    chrome.tabs.query({currentWindow: true, active: true}),
    fuction (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, hi)
    }
  }
})
