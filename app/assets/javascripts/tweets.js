// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("#new_tweet");
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    $.ajax({
      url: form.getAttribute("action"),
      method: form.getAttribute("method"),
      data: $(form).serialize(),
      dataType: "json"
    }).done(function(responseData) {
      form.reset();

      var tweets = document.querySelector(".tweets");
      var tweet = document.createElement("li");
      tweet.className = "tweet";

      var tweetMessage = document.createElement("p");
      var tweetMessageText = document.createTextNode(responseData.message);
      tweetMessage.appendChild(tweetMessageText);
      tweet.appendChild(tweetMessage);

      var tweetTime = document.createElement("time");
      var tempDate = new Date(responseData.created_at)
      var tweetTimeText = document.createTextNode(formatDate(tempDate));

      tweetTime.appendChild(tweetTimeText);
      tweet.appendChild(tweetTime);

      $(tweets).prepend(tweet);
    });
  });

  function formatDate(date) {
    var monthNames = [
      "Jan", "Fev", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct","Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();

    var ampm = "AM";
    if (hour > 12) {
      hour -= 12;
      ampm = "PM";
    }

    var fullDate = monthNames[monthIndex] + " " + day;
    var fullTime = hour + ":" + minute + " " + ampm;

    return fullDate + ", " + fullTime
  };
});