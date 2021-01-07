// Hier kommt noch dein Logik und DB Code rein



$('#bootstrapForm').submit(function (event) {
    event.preventDefault()
    var extraData = {}
    $('#bootstrapForm').ajaxSubmit({
        data: extraData,
        dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
        error: function () {
            // Submit of form should be successful but JSONP callback will fail because Google Forms
            // does not support it, so this is handled as a failure.
            // alert('Form Submitted. Thanks.')
            // You can also redirect the user to a custom thank-you page:
            window.location = '6_Thankyou.html'
        }
    })
});


let lernvideo = document.querySelector(".lernvideo"),
    wissensfragebogen = document.querySelector(".wissensfragebogen");

function showWissensfragebogen(){
  let result = confirm("Haben Sie das Video komplett angeschaut?");
  if(result){
    lernvideo.classList.add("hidden");
    wissensfragebogen.classList.remove("hidden");
  }
}
