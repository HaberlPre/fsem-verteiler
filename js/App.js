/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";
  
  var that = {},
  db;

  function init(firebase) {
	console.log("hi");
    initFirebase(firebase);
  }

  function initFirebase(firebase) {
    console.log(firebase.app().name);
    that.db = firebase.firestore();
	setID("test");
	getData("test");
  }
  
  function setID(id) {
	that.db.collection("IDs").doc(id).set({
	"name": id
	})
  }
  
  function getData(id) {
	var ref = that.db.collection("IDs").doc(id);
	ref.get().then(function(doc) {
      console.log(doc.data());
    }).catch(function(error) {
        //console.log("Error getting cached document:", error);
    });

  }

  that.init = init;
  return that;
}());
