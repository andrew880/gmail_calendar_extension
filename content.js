
const matches = document.documentElement.innerHTML.match(re) || []

chrome.runtime.sendMessage({
  url: window.location.href,
  count: matches.length
})
// var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.requested == "createDiv") {
            //Code to create the div
            sendResponse({confirmation: "Successfully created div"});
        }
    });
