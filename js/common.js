// wissensfragebogen erst nach Video anzeigen
  let lernvideo = document.querySelector(".lernvideo"),
      wissensfragebogen = document.querySelector(".wissensfragebogen");

  function showWissensfragebogen(){
    let result = confirm("Haben Sie das Video komplett angeschaut?");
    if(result){
      lernvideo.classList.add("hidden");
      wissensfragebogen.classList.remove("hidden");
    }
  }


  // Submit-Button nicht klickbar machen wenn nicht alles ausgefüllt
  let allRequiredInputs = document.querySelectorAll("input[required]");
  let submitButton = document.querySelector("input[type='submit']");

  function validateInputs(){
    let inputsEmpty = false;
    for(let i = 0; i < allRequiredInputs.length; i++){
      if(allRequiredInputs[i].value == null || allRequiredInputs[i].value == ""){
        inputsEmpty = true;
      }
    }

    if(inputsEmpty){
      submitButton.disabled = true;
    }else{
      submitButton.disabled = false;
    }
  }


// Wenn html-Seite geladen hat, einmal Input validieren
window.onload = function(){
  validateInputs();
}
