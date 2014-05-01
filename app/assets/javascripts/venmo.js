// #sandbox
// response = HTTParty.post('https://sandbox-api.venmo.com/v1/payments',
//   :query => { :access_token => 'Px2vW5wqcsSKPuEN6XVbDAw2aXwWBLZT',
//               :user_id => 145434160922624933,
//               :email => 'venmo@venmo.com',
//               :note => 'it is complete',
//               :amount => -0.10})

// #getting my profile
// response = HTTParty.get('https://api.venmo.com/v1/me?', :query => {:access_token => 'Px2vW5wqcsSKPuEN6XVbDAw2aXwWBLZT'})

// #getting my friends
// response = HTTParty.get('https://api.venmo.com/v1/users/1409404993798144722/friends?',
//   :query => {:access_token => 'Px2vW5wqcsSKPuEN6XVbDAw2aXwWBLZT'})

// #getting jenna's friends
// response = HTTParty.get('https://api.venmo.com/v1/users/1103723682070528280/friends?',
//   :query => {:access_token => 'Px2vW5wqcsSKPuEN6XVbDAw2aXwWBLZT'})

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
