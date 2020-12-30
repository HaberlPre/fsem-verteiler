/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";
  
  var that = {},
  db,
  id;

  function init(firebase) {
	console.log("hi");
    initFirebase(firebase);
	setupInput();
  }

  function initFirebase(firebase) {
    console.log(firebase.app().name);
    that.db = firebase.firestore();
	
	//setID("test");
	//getData("test");
  }
  
  function setID() {
	that.db.collection("IDs").doc(id).set({
	"name": id
	})
	supplyVideo();
  }
  
  function getData() {
	var ref = that.db.collection("IDs").doc(id);
	ref.get().then(function(doc) {
      console.log(doc.data());
    }).catch(function(error) {
        //console.log("Error getting cached document:", error);
    });
  }
  
  function setupInput(){
	let idButton = document.getElementById("idInputButton"),
	idInput = document.getElementById("idInput");
	
	idButton.addEventListener("click", function() {
      id = idInput.value;
	  console.log(id);
	  checkDBforID();
    });
	
	idInput.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
		id = idInput.value;
		console.log(id);
		checkDBforID();
	  }
	});
  }
  
  function checkDBforID() {
	let idArray = [];
	that.db.collection("IDs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.id);
          //console.log(doc.data());
          idArray.push(doc.data().name);
		})
	});
	//console.log(idArray);
	
	setTimeout(function (){
		if(idArray.includes(id)) {
			console.log("video");
			supplyVideo();
		} else {
			console.log("setid");
			setID();
		}
    }, 1000); //timeout required for database to answer
  }
  
  function supplyVideo() {
	getData();
	//balancing
	document.getElementById('output').innerHTML = 'Hier könnte dein Link stehen';
	//console.log("video");
  }

  that.init = init;
  return that;
}());
