/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";

  var that = {},
  db,
  id,
  vid_index,
  pos;

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
	"name": id,
	"subVideoIndex": 998,
	"videoIndex": vid_index,
  "logStr" : ""
	})
	supplyPreQuestionnaire();
  }

  function getData() {
	var ref = that.db.collection("IDs").doc(id);
	ref.get().then(function(doc) {
      //console.log(Object.values(doc.data()));
	  //sessionStorage.setItem("userData", Object.values(doc.data()));
	  sessionStorage.setItem("userSubID", doc.data().subVideoIndex);
    var wipIndex = doc.data().videoIndex; //eig nicht nötig? bsp: index 36 kann man mit 0 nachholen
    console.log(wipIndex);
    /*if (wipIndex < 900 && wipIndex > 71) { //eig nichtmehr nötig
      wipIndex -= 72;
    } else if (wipIndex < 900 && wipIndex > 35) {
      wipIndex -= 36;
    }
    console.log(wipIndex);
    sessionStorage.setItem("userVideoID", wipIndex);*/
	  //sessionStorage.setItem("userVideoID", doc.data().videoIndex);
    sessionStorage.setItem("logStr", doc.data().logStr);

    sessionStorage.setItem("videoLink1", doc.data().videoLink1);
    sessionStorage.setItem("videoLink2", doc.data().videoLink2);
    sessionStorage.setItem("videoLink3", doc.data().videoLink3);
    sessionStorage.setItem("videoLink4", doc.data().videoLink4);
    }).catch(function(error) {
        //console.log("Error getting cached document:", error);
    });
  }

  function setupInput(){
	let idButton = document.getElementById("idInputButton"),
	idInput = document.getElementById("idInput"),
  indexInput = document.getElementById("indexInput");

	idButton.addEventListener("click", function() {
      idButton.disabled = true;
      id = idInput.value;
      vid_index = parseInt(indexInput.value);
  	  console.log(id, vid_index);
  	  sessionStorage.setItem("userID", id);
      sessionStorage.setItem("userVideoID", vid_index);
  	  checkDBforID();
    });

	idInput.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
  		id = idInput.value;
  		console.log(id);
  		sessionStorage.setItem("userID", id);
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
			supplyPreQuestionnaire();
		} else {
			console.log("setid");
			setID();
		}
    }, 1000); //timeout required for database to answer
  }

  function supplyPreQuestionnaire() {
	getData();
	//balancing
	//document.getElementById('output').innerHTML = 'Hier könnte dein Link stehen';
	//console.log("video");

	//zur neuen Seite //auf db warten
	setTimeout(function (){
    pos = parseInt(sessionStorage.getItem("userSubID"));
    if (pos == 998) {
  		window.location.href="1_vorfragebogen.html";
    } else if (pos == 0) {
      window.location.href="2_video_Geschichte.html";
    } else if (pos == 1) {
      window.location.href="3_video_Funktion.html";
    } else if (pos == 2) {
      window.location.href="4_video_Belichtung.html";
    } else if (pos == 3) {
      window.location.href="5_video_Brennweite.html";
    } else if (pos == 4) {
      window.location.href="6_Thankyou.html";
    } else {
      window.location.href="1_vorfragebogen.html";
    }

  	}, 1000); //timeout required for database to answer

  }

  //TODO: getData eig nur nötig, wenn user Seite schließen können soll -> nützlich aber viel mehraufwand

  that.init = init;
  return that;
}());
