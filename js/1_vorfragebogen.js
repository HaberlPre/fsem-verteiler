/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";

  var that = {},
  db,
  id,
  videoIdArray = [],
  databaseIndexType = "testIndex", //bei release "liveIndex"; test: "textIndex"
  //databaseIndexType = "liveIndex", //bei release "liveIndex"; test: "textIndex"
  databaseVideoIndex = 1000,
  userVideoIndex = 1000,
  userSubVideoIndex = 1000,
  logStr;

  function init(firebase) {
	console.log("hola bogen");
  initFirebase(firebase);
	setupInput();
	id = sessionStorage.getItem("userID");
	console.log(id);
  loadIDs();
  document.getElementById("1752850528").value = id; //value bei finalem Bogen anpassen
	setupVideoIds();
	console.log(sessionStorage.getItem("userVideoID")); //default: name, subVideoIndex = 998, videoIndex = 999
	userVideoIndex = sessionStorage.getItem("userVideoID");
	userSubVideoIndex = sessionStorage.getItem("userSubID");
  logStr = sessionStorage.getItem("logStr");
  }

  function loadIDs() {
    var ref = that.db.collection("IDs").doc(id);
    ref.get().then(function(doc) {
        //console.log(Object.values(doc.data()));
      //sessionStorage.setItem("userData", Object.values(doc.data()));
      sessionStorage.setItem("userSubID", doc.data().subVideoIndex);
      var wipIndex = doc.data().videoIndex;
      console.log(wipIndex);
      if (wipIndex < 900 && wipIndex > 71) { //eig nichtmehr nötig
        wipIndex -= 72;
      } else if (wipIndex < 900 && wipIndex > 35) {
        wipIndex -= 36;
      }
      console.log(wipIndex);
      sessionStorage.setItem("userVideoID", wipIndex);
      userVideoIndex = wipIndex;
    }).catch(function(error) {
        //console.log("Error getting cached document:", error);
    });
    console.log(sessionStorage.getItem("userVideoID")); //default: name, subVideoIndex = 998, videoIndex = 999

  }

  function setupVideoIds() {
	  //uniqueVideoIds
    //?rel=0 -> keine videos am ende
	  //Video 1 - geschichte
		//permutation 1: gut schlecht
		let v1_1 = "https://www.youtube.com/embed/L7RAYOWtosQ?rel=0"; //good video, bad audio
		//let v1_1 = "v1_1";
		//permutation 2: schlecht gut
		let v1_2 = "https://www.youtube.com/embed/aw2ICAbBNnE?rel=0"; //bad video, good audio
		//let v1_2 = "v1_2";
		//permtation 3: schlecht schlecht
		let v1_3 = "https://www.youtube.com/embed/YaNa1yQScwA?rel=0"; //bad video, bad audio
		//let v1_3 = "v1_3";

	  //Video 2 - funktion
		//permutation 1: pip
		let v2_1 = "https://www.youtube.com/embed/-boizFQrzsQ?rel=0"; //pip
		//let v2_1 = "v2_1";
		//permutation 2: slides
		let v2_2 = "https://www.youtube.com/embed/bjPQBuNfp-o?rel=0"; //slides
		//let v2_2 = "v2_2";
		//permutation 3: cam
		let v2_3 = "https://www.youtube.com/embed/hC7tJ6uRH60?rel=0"; //cam
		//let v2_3 = "v2_3";

	  //Video 3 - belichtung
		//permutation 1: gut schlecht
		let v3_1 = "https://www.youtube.com/embed/rcHCdDZ2Hsg?rel=0"; //good video, bad audio
		//let v3_1 = "v3_1";
		//permutation 2: schlecht gut
		let v3_2 = "https://www.youtube.com/embed/lwZbCl2zeos?rel=0"; //bad video, good audio
		//let v3_2 = "v3_2";
		//permutation 3: schlecht schlecht
		let v3_3 = "https://www.youtube.com/embed/1qDnz_g9GV4?rel=0"; //bad video, bad audio
		//let v3_3 = "v3_3";

	  //Video 4 - brennweite
		//permutation 1: pip
		let v4_1 = "https://www.youtube.com/embed/AACiKb0ZV-M?rel=0"; //pip
		//let v4_1 = "v4_1";
		//permutation 2: slides
		let v4_2 = "https://www.youtube.com/embed/Vo4lm94wDJI?rel=0"; //slides
		//let v4_2 = "v4_2";
		//permutation 3: cam
		let v4_3 = "https://www.youtube.com/embed/DgEZ2Y5BFMY?rel=0"; //cam
		//let v4_3 = "v4_3";

		/*let v1Array = [v1_1, v1_2, v1_3], //videoArrays
		v2Array = [v2_1, v2_2, v2_3],
		v3Array = [v3_1, v3_2, v3_3],
		v4Array = [v4_1, v4_2, v4_3];*/

		let gruppeA_Brocken1 = [v1_1, v3_2], //oder Brocken (wie auf google doc)
		gruppeA_Brocken2 = [v1_2, v3_1],
		gruppeA_Brocken3 = [v1_1, v3_3],
		gruppeA_Brocken4 = [v1_3, v3_1],
		gruppeA_Brocken5 = [v1_3, v3_2],
		gruppeA_Brocken6 = [v1_2, v3_3],
		gruppeB_Brocken1 = [v2_1, v4_2], //Gruppe B
		gruppeB_Brocken2 = [v2_2, v4_1],
		gruppeB_Brocken3 = [v2_1, v4_3],
		gruppeB_Brocken4 = [v2_3, v4_1],
		gruppeB_Brocken5 = [v2_3, v4_2],
		gruppeB_Brocken6 = [v2_2, v4_3];

		let gruppeA_Fels = [], //Fels = viele Brocken
		gruppeB_Fels = [];

		gruppeA_Fels.push(gruppeA_Brocken1, gruppeA_Brocken2, gruppeA_Brocken3, gruppeA_Brocken4, gruppeA_Brocken5, gruppeA_Brocken6);
		gruppeB_Fels.push(gruppeB_Brocken1, gruppeB_Brocken2, gruppeB_Brocken3, gruppeB_Brocken4, gruppeB_Brocken5, gruppeB_Brocken6);

		console.log(gruppeA_Fels, gruppeB_Fels);

		for (var i of gruppeA_Fels) {
			for (var j of gruppeB_Fels) {
				var smallSubArray = [];
				smallSubArray.push(i[0], j[0], i[1], j[1]);
				//console.log(smallSubArray);
				videoIdArray.push(smallSubArray);
			}
		}
		console.log(videoIdArray);
		/** ergebnis - das auch ok? sonst muss man hardcoden; zuteilungen passen, nur halt sortierter
		 0: (4) ["v1_1", "v2_1", "v3_2", "v4_2"]
		 1: (4) ["v1_1", "v2_2", "v3_2", "v4_1"]
		 2: (4) ["v1_1", "v2_1", "v3_2", "v4_3"]
		 3: (4) ["v1_1", "v2_3", "v3_2", "v4_1"]
		 4: (4) ["v1_1", "v2_3", "v3_2", "v4_2"]
		 5: (4) ["v1_1", "v2_2", "v3_2", "v4_3"]
		 6: (4) ["v1_2", "v2_1", "v3_1", "v4_2"]
		 7: (4) ["v1_2", "v2_2", "v3_1", "v4_1"]
		 8: (4) ["v1_2", "v2_1", "v3_1", "v4_3"]
		 9: (4) ["v1_2", "v2_3", "v3_1", "v4_1"]
		10: (4) ["v1_2", "v2_3", "v3_1", "v4_2"]
		11: (4) ["v1_2", "v2_2", "v3_1", "v4_3"]
		12: (4) ["v1_1", "v2_1", "v3_3", "v4_2"]
		13: (4) ["v1_1", "v2_2", "v3_3", "v4_1"]
		14: (4) ["v1_1", "v2_1", "v3_3", "v4_3"]
		15: (4) ["v1_1", "v2_3", "v3_3", "v4_1"]
		16: (4) ["v1_1", "v2_3", "v3_3", "v4_2"]
		17: (4) ["v1_1", "v2_2", "v3_3", "v4_3"]
		18: (4) ["v1_3", "v2_1", "v3_1", "v4_2"]
		19: (4) ["v1_3", "v2_2", "v3_1", "v4_1"]
		20: (4) ["v1_3", "v2_1", "v3_1", "v4_3"]
		21: (4) ["v1_3", "v2_3", "v3_1", "v4_1"]
		22: (4) ["v1_3", "v2_3", "v3_1", "v4_2"]
		23: (4) ["v1_3", "v2_2", "v3_1", "v4_3"]
		24: (4) ["v1_3", "v2_1", "v3_2", "v4_2"]
		25: (4) ["v1_3", "v2_2", "v3_2", "v4_1"]
		26: (4) ["v1_3", "v2_1", "v3_2", "v4_3"]
		27: (4) ["v1_3", "v2_3", "v3_2", "v4_1"]
		28: (4) ["v1_3", "v2_3", "v3_2", "v4_2"]
		29: (4) ["v1_3", "v2_2", "v3_2", "v4_3"]
		30: (4) ["v1_2", "v2_1", "v3_3", "v4_2"]
		31: (4) ["v1_2", "v2_2", "v3_3", "v4_1"]
		32: (4) ["v1_2", "v2_1", "v3_3", "v4_3"]
		33: (4) ["v1_2", "v2_3", "v3_3", "v4_1"]
		34: (4) ["v1_2", "v2_3", "v3_3", "v4_2"]
		35: (4) ["v1_2", "v2_2", "v3_3", "v4_3"]
		*/

  }

  function initFirebase(firebase) {
    console.log(firebase.app().name);
    that.db = firebase.firestore();

	//setID("test");
	//getData("test");
  }



  function setupInput(){
	let videoButton1 = document.getElementById("startStudy");

	videoButton1.addEventListener("click", function() {
	  console.log("bogen done");
	  //setTimeout(function (){
		supplyVideo();
	  //}, 1000); //timeout required for database to answer
    });
  }


  function supplyVideo() {
    //balancing
    //document.getElementById('output').innerHTML = 'Hier könnte dein Link stehen';
    //console.log("video");

    //todo: videos zuweisen

    //zuvor schauen ob user schon index zugewiesen bekommen hat?
    if (userVideoIndex == 999) {
    	//aktuellen videoIndex aus DB ziehen
    	var getIndexRef = that.db.collection("videoIndex").doc(databaseIndexType);
    	getIndexRef.get().then(function(doc) {
    	  databaseVideoIndex = doc.data().index;
    	  console.log(databaseVideoIndex);
    	}).catch(function(error) {
    		//console.log("Error getting cached document:", error);
    	});
      //}
		    //db warten
  		setTimeout(function (){

  			//userid den videoindex zuweisen
  			that.db.collection("IDs").doc(id).update({
  			"videoIndex": parseInt(databaseVideoIndex),
  			"subVideoIndex": 0
  			})
  			//userid subIndex zuweisen (bsp video 2 auf liste dran) ^
  			userSubVideoIndex = 0;

        if (databaseVideoIndex < 900) {
    			that.db.collection("videoIndex").doc(databaseIndexType).update({
    				"index": parseInt(databaseVideoIndex)+1
    			})
        }

        if (databaseVideoIndex > 71) {
          databaseVideoIndex -= 72;
        } else if (databaseVideoIndex > 35) {
          databaseVideoIndex -= 36;
        }
        console.log(databaseVideoIndex);

        //console.log(videoIdArray[databaseVideoIndex]);
        //console.log(videoIdArray[databaseVideoIndex][0]);
        sessionStorage.setItem("videoLink1", videoIdArray[databaseVideoIndex][0]);
        sessionStorage.setItem("videoLink2", videoIdArray[databaseVideoIndex][1]);
        sessionStorage.setItem("videoLink3", videoIdArray[databaseVideoIndex][2]);
        sessionStorage.setItem("videoLink4", videoIdArray[databaseVideoIndex][3]);

        that.db.collection("IDs").doc(id).update({
        "videoLink1": videoIdArray[databaseVideoIndex][0],
        "videoLink2": videoIdArray[databaseVideoIndex][1],
        "videoLink3": videoIdArray[databaseVideoIndex][2],
        "videoLink4": videoIdArray[databaseVideoIndex][3],
        })
  		}, 999); //timeout required for database to answer

  	} else if (userVideoIndex == 1000) {
  		console.log("error");
  	} else {
  		//todo data aus db ziehen
  		console.log("todo load data - geht? vgl index -> app -> getData");
      if (databaseVideoIndex < 900 && databaseVideoIndex > 71) { //eig nichtmehr nötig
        databaseVideoIndex -= 72;
      } else if (databaseVideoIndex < 900 && databaseVideoIndex > 35) {
        databaseVideoIndex -= 36;
      }
    }
    console.log(databaseVideoIndex);
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
            //window.location = '2_video_Geschichte.html'
            setTimeout(function (){ //auf db warten
              //console.log("neue seite"); //videolink ist hier -> in sessionStorage (?)
              window.location.href= '2_video_Geschichte.html'; //wenn getData ein ergebnis für bereits gesehene videos bringt überspringen?
            }, 2500); //timeout required for database to answer
        }
    })
})
