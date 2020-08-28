function createSidebaordButton() {
  stnButtonWrapper = document.createElement('div');
  // stnButtonWrapper.className = 'sideboard-button-wrapper';
  stnButton = document.createElement('button');
  stnButton.className = 'sideboard-button momo-menu-button';
  stnButton.innerHTML = '📋';
  stnButton.addEventListener('click', function(e) {
    chrome.runtime.sendMessage({status: 'displayStyle', display: 'sideboard'}, function(response) {
      enableSideboard(response.display);
      loadSideboardItems(response.display);
      displayUI(response.enabled, response.displayItems);
    });
  });
  stnButtonWrapper.appendChild(stnButton);
  return stnButtonWrapper;
}
function enableSideboard(enable) {
  item = document.getElementById('sideboard-container');
  item.style.display = enable ? 'block' : 'none';
  document.body.style.marginRight = enable ? "250px" : "0px";
}
function loadSideboard() {
  sideboardContainer = document.createElement('div');
  sideboardContainer.id = 'sideboard-container';
  sideboardContainer.className = "sideboard";
  sideboardContainer.style.height = document.body.scrollHeight + "px";
  tabs = document.createElement('div');
  tabs.className = "tab";
  // contents = document.createElement('div');
  for (var key in menuItemsId) {
    tab = document.createElement('button');
    tab.className = "tab-links";
    tab.innerHTML = key;
    tab.setAttribute("data-id", menuItemsId[key]);
    tab.addEventListener('click', function(e) {
      tabContainers = document.getElementsByClassName("momo-container");
      for (i = 0; i < tabContainers.length; i++) {
        tabContainers[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tab-links");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      chrome.runtime.sendMessage({status:"displayOnlyUpdate", itemsId:[this.getAttribute("data-id"), 'sideboard-container']});
      document.getElementById(this.getAttribute("data-id")).style.display = "block";
      this.className += " active";
    });
    // todo: add tab content
    // tabContent = document.createElement("div");
    // tabContent.className = "tab-content";
    // tabContent.id = key;
    // tabContent.innerHTML = key;
    // contents.appendChild(tabContent);
    tabs.appendChild(tab);
  }
  sideboardContainer.appendChild(tabs);
  // sideboardContainer.appendChild(contents);
  return sideboardContainer
}
function loadSideboardItems(loading) {
  //modify item position to fit in sideboard
  tabContainers = document.getElementsByClassName("momo-container");
  for (i = 0; i < tabContainers.length; i++) {
    for (j = 0; j < tabContainers[i].childNodes.length; j++) {
      node = tabContainers[i].childNodes[j];
      style = node.style.cssText;
      if (loading) {
        node.setAttribute("data-style", node.style.cssText);
        console.log(node.style.cssText);
        node.style.width = "230px";
        node.style.height = "120px";
        node.style.left = "";
        item = document.getElementById('sideboard-container');
        node.classList.add("sideboard-elements");
        //todo make css for items -> width height others
      } else {
        node.classList.remove("sideboard-elements");
        node.style = node.getAttribute("data-style");
      }
    }
  }
}
