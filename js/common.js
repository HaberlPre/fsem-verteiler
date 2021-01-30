// wissensfragebogen erst nach Video anzeigen
  let lernvideo = document.querySelector(".lernvideo"),
      wissensfragebogen = document.querySelector(".wissensfragebogen");

  function showWissensfragebogen(){
    let result = confirm("Haben Sie das Video komplett angeschaut?");
    if(result){
      lernvideo.classList.add("hidden");
      lernvideo.remove();
      wissensfragebogen.classList.remove("hidden");
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }


  // Submit-Button nicht klickbar machen wenn nicht alles ausgefüllt
  let allRequiredInputs = document.querySelectorAll("input[required]");
  let submitButton = document.querySelector("input[type='submit']");

  let allRadios = document.querySelectorAll("input[type='radio']");
  let allCheckboxes = document.querySelectorAll("input[type='checkbox']");


  function validateInputs(){
    let inputsEmpty = false;

    let radiosChecked = 0;
    let checkboxesChecked = 0;
    for(let i = 0; i < allRadios.length; i++){
      if(allRadios[i].checked){
        radiosChecked++;
      }
    }
    for(let i = 0; i < allCheckboxes.length; i++){
      if(allCheckboxes[i].checked){
        checkboxesChecked++;
      }
    }

    if(radiosChecked !== 10 || checkboxesChecked == 0){
      inputsEmpty = true;
    }else{
      //Fakultät-Radiobutton
      if(document.getElementById('fakultaet-other-radio').checked){
        if(document.getElementById('fakultaet-other-text').value == null ||
           document.getElementById('fakultaet-other-text').value == ""){
             inputsEmpty = true;
        }
      }

      //benutzte Kameras - checkbox
      if(document.getElementById('kameras-other-checkbox').checked){
        if(document.getElementById('kameras-other-text').value == null ||
           document.getElementById('kameras-other-text').value == ""){
             inputsEmpty = true;
        }
      }

      //verwendetes Gerät
      if(document.getElementById('device-other-radio').checked){
        if(document.getElementById('device-other-text').value == null ||
           document.getElementById('device-other-text').value == ""){
             inputsEmpty = true;
        }
      }

      //Audioausgabe
      if(document.getElementById('audio-other-radio').checked){
        if(document.getElementById('audio-other-text').value == null ||
           document.getElementById('audio-other-text').value == ""){
             inputsEmpty = true;
        }
      }
    }

    if(inputsEmpty){
      submitButton.disabled = true;
    }else{
      submitButton.disabled = false;
    }

    // let inputsEmpty = false;
    // for(let i = 0; i < allRequiredInputs.length; i++){
    //   if(allRequiredInputs[i].value == null || allRequiredInputs[i].value == ""){
    //     inputsEmpty = true;
    //   }
    // }
    //
    // if(inputsEmpty){
    //   submitButton.disabled = true;
    // }else{
    //   submitButton.disabled = false;
    // }
  }

  let idInput = document.getElementById("idInput"),
  indexInput = document.getElementById("indexInput");
  function validateIDInput(){
    if(idInput.value == null || idInput.value == ""|| indexInput.value == null || indexInput.value == ""){
        submitButton.disabled = true;
      }else{
        submitButton.disabled = false;
      }
  }


// Wenn html-Seite geladen hat, einmal Input validieren
// window.onload = function(){
//   validateInputs();
// }
