function createWhitebaordButton() {
  stnButtonWrapper = document.createElement('div');
  stnButtonWrapper.className = 'whiteboard-button-wrapper';
  stnButton = document.createElement('button');
  stnButton.className = 'whiteboard-button momo-menu-button';
  stnButton.innerHTML = '📋';
  stnButton.addEventListener('click', function(e) {
    chrome.runtime.sendMessage({status: 'display', itemId: 'whiteboard-container'}, function(response) {
      item = document.getElementById('white-container');
      item.style.display = response.display ? 'block' : 'none';
    });
  });
  stnButtonWrapper.appendChild(stnButton);
  return stnButtonWrapper;
}
