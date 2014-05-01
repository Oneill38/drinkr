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
      var chargeAmount = $("<input>").attr('type','number').attr('placeholder','Amount').appendTo('#payment_split');
      var actualChargeAmount = "-" + chargeAmount.val();
    });
  }
      // $.ajax({
      //   type: 'post',
      //   url: 'welcome/makevenmopayment'
      //   data: { email: chargeEmail, note: chargeNote,}


      // });
}
