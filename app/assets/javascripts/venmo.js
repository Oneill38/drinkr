

var venmoFunctioning = {

  onReady: function(){
    $("#venmo_split").on('click', function(event){
      console.log("venmo split");
      $("<div id='payment_split'>").appendTo("div.basket");
      $("<h3>").text("Split Payment").appendTo("#payment_split");
      var chargeEmail = $("<input>").attr('type','text').attr('placeholder','Email').appendTo('#payment_split');
      var chargeNote = $("<input>").attr('type','text').attr('placeholder','Note').appendTo('#payment_split');
      var chargeAmount = $("<input>").attr('type','text').attr('placeholder','Amount').appendTo('#payment_split');
      var chargeSubmit = $("<button>").text("Charge!").appendTo('#payment_split');
      $(chargeSubmit).on('click', function(event){
        alert("clicked");
        $.ajax({
          type: 'POST',
          url: 'welcome/makevenmopayment',
          data: {email: chargeEmail.val(), note: chargeNote.val(), amount: chargeAmount.val()},
          dataType: 'JSON'
          }).done(function(data){
            console.log(data);
            var status = "Your charge status: " + data.data.payment.status
            $("#payment_split").empty()
            $("<p>").text(status).appendTo(".basket");
          });
      });

    });
  }




}
