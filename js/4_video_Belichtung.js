/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";

  var that = {},
  db,
  id,
  videoLink,
  logStr;

  function init(firebase) {
  console.log("hola video belichtung");
  initFirebase(firebase);
  id = sessionStorage.getItem("userID");
  console.log(id);
  document.getElementById("465905592").value = id; //value bei finalem Bogen anpassen
  setupInput();
  videoLink = sessionStorage.getItem("videoLink3");
  //console.log(videoLink);
  document.getElementById("videoiFrame").src = videoLink;
  logStr = sessionStorage.getItem("logStr");

  addToLogStr("video3Start");
  /*setupVideoIds();
  //console.log(sessionStorage.getItem("userVideoID")); //default: name, subVideoIndex = 998, videoIndex = 999
  userVideoIndex = sessionStorage.getItem("userVideoID");
  userSubVideoIndex = sessionStorage.getItem("userSubID");*/
  }

  function addToLogStr(str) {
    logStr += str + ": " + Date.now() + "; ";
    sessionStorage.setItem("logStr", logStr);
    that.db.collection("IDs").doc(id).update({
    "logStr": logStr
    })
  }

  function initFirebase(firebase) {
    console.log(firebase.app().name);
    that.db = firebase.firestore();
  }

  function setupInput(){
    let fragebogenButton = document.getElementById("zumFragebogen"),
    nextVideoButton = document.getElementById("nextVideo");

    fragebogenButton.addEventListener("click", function() {
      console.log("video 3 done");
      addToLogStr("video3Done, fragebogen3Start");
      //todo timestamp merken
    });
    nextVideoButton.addEventListener("click", function() {
      console.log("zum nächsten Video");
      addToLogStr("fragebogen3Ende");
      that.db.collection("IDs").doc(id).update({
      "subVideoIndex": parseInt(3)
      })
    });

  }

  that.init = init;
  return that;
}());


// Google Form Code
$('#bootstrapForm').submit(function (event) {
    event.preventDefault()
    document.querySelector("input[type='submit']").disabled = true;
    var extraData = {}
    $('#bootstrapForm').ajaxSubmit({
        data: extraData,
        dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
        error: function () {
            // Submit of form should be successful but JSONP callback will fail because Google Forms
            // does not support it, so this is handled as a failure.
            // alert('Form Submitted. Thanks.')
            // You can also redirect the user to a custom thank-you page:
            //window.location = '5_video_Brennweite.html'
            setTimeout(function (){ //auf db warten
              //console.log(videoIdArray[databaseVideoIndex]); //videolink ist hier -> in sessionStorage (?)
              window.location = '5_video_Brennweite.html'
            }, 1000); //timeout required for database to answer
        }
    })
});
