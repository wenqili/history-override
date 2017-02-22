var count = 0;
// window.location.replace("chrome://history");
document.addEventListener('DOMContentLoaded',function(){
  buildList();
})

function buildList(){
  var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
  console.log(oneWeekAgo);


  chrome.history.search({
        'text': '',              // Return every history item....
        'startTime': oneWeekAgo,  // that was accessed less than one week ago.
        'maxResults':1000
      },
      function(historyItems) {
        for (var i = 0; i < historyItems.length; ++i) {
          var url = historyItems[i].url;
          var lastTime = historyItems[i].lastVisitTime;
          // console.log("url",url);
          // console.log("last",lastTime);
          if(url.indexOf('google')!=-1){
            count ++;
            console.log(count,url);
          }
        }
        shoutOut();
        console.log(historyItems.length);

      });



}

function shoutOut(){
  var text = "After scanning the chrome history of this laptop, we know the owner visited porn sites " + count + " times last week. 😂😂😂";
  // console.log(text);
  var p = document.createElement("p");
  p.innerText = text;
  document.body.appendChild(p);
  chrome.tts.speak(text, {enqueue: true});
  // count = 0;
  console.log(count);
}
