/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";
  
  var that = {},
  db,
  id;

  function init(firebase) {
	console.log("dios mio video");
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
	let fragebogenButton = document.getElementById("fragebogen");
	
	fragebogenButton.addEventListener("click", function() {
	  console.log("video done");
	  supplyVideo();
    });
	
  }
  
  
  function supplyVideo() {
	//balancing
	//document.getElementById('output').innerHTML = 'Hier könnte dein Link stehen';
	//console.log("video");
	window.location.href="bogen.html"; //wenn getData ein ergebnis für bereits gesehene videos bringt überspringen?
  }

  that.init = init;
  return that;
}());
