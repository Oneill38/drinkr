var Landing = {

  onReady: function() {
    $("<input>").attr( 'type' , 'text' ).attr( 'id' , 'search_drinks' ).appendTo("body");
    $("#search_drinks").on('keyup', function(event){
      console.log(event);
      if (event.which === 13 || event.keyCode === 13){
        console.log($(this).val());
      }
    });

  }

}

$(document).ready(Landing.onReady);


// .addEventListener("keyup", app.getLetter);

// getInput = function(event){
//   // console.log("key up", event);
//   if (event.which === 13 || event.keyCode === 13) {
//     var letter = app.controls.letter.value;
//     console.log(letter);
//     app.controls.letter.value = "";
//   }
// }