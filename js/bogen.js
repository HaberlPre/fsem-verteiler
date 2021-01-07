/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";
  
  var that = {},
  db,
  id;

  function init(firebase) {
	console.log("bogen de la frage");
    initFirebase(firebase);
	setupInput();
	id = sessionStorage.getItem("userID");
	console.log(id);
  }

  function initFirebase(firebase) {
    console.log(firebase.app().name);
    that.db = firebase.firestore();
	
	//setID("test");
	//getData("test");
  }
  
  
  
  function setupInput(){
	let videoButton = document.getElementById("videoButton");
	
	videoButton.addEventListener("click", function() {
	  console.log("bogen done");
	  supplyVideo();
    });
	
  }
  
  
  function supplyVideo() {
	//balancing
	//document.getElementById('output').innerHTML = 'Hier könnte dein Link stehen';
	//console.log("video");
	window.location.href="video.html"; //wenn getData ein ergebnis für bereits gesehene videos bringt überspringen?
  }

  that.init = init;
  return that;
}());
