// alert("Grr..")
chrome.runtime.onMessage.addEventListener.(function (request) {
  alert(request)
})
var images = document.getElementsByTagName('img');
for (var i = 0, l = images.length; i < l; i++) {
  images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
}
