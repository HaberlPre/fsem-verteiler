/* eslint-env browser */

var App = App || {};
App = (function() {
  "use strict";

  var that = {},
  db,
  idArray;

  function init(firebase) {
    initFirebase(firebase);
  }

  function initFirebase(firebase) {
    //console.log(firebase.app().name);
    that.db = firebase.firestore();
    getAllClassIDs();
  }

  function getAllClassIDs() {
    idArray = [];
    that.db.collection("IDs").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id);
        let subArray = [];
        console.log(doc.data());
        subArray.push(doc.data().name);
        subArray.push("XsepX");
        subArray.push(doc.data().videoIndex);
        subArray.push("XsepX");
        subArray.push(doc.data().logStr);
        idArray.push(subArray);
      })
    });
    setTimeout(function() {
      writeDataToLocalStorage();
      console.log(idArray);
    },4000)
  }

  function writeDataToLocalStorage() {
    let ts = new Date().getTime(),
    filename = ts+"asCSV.csv",//.txt,
    text = JSON.stringify(idArray);
    /*let wipArray = [];
    for (let i=0; i<studentDataArray.length; i++) {
      wipArray.push(JSON.stringify(studentDataArray[i]));
    }
    */
    var element = document.createElement('a');
    /*element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(wipArray));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    */
    filename = ts+"asTXT.txt";
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none'; //
    document.body.appendChild(element);//

    element.click();

    document.body.removeChild(element);
  }


  that.init = init;
  return that;
}());
