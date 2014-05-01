var venmoFunctioning = {

  onReady: function(){
    $("#venmo_split").on('click', function(event){
      console.log("venmo split");
      $("<div id='payment_split'>").appendTo("div.basket");
      $("<h3>").text("Split Payment").appendTo("#payment_split");
      var chargeNote = $("<input>").attr('type','text').attr('placeholder','Note').appendTo('#payment_split');
      var chargeAmount = $("<input>").attr('type','text').attr('placeholder','Amount').appendTo('#payment_split');
      var chargeEmail = $("<input id='submitEmail'>").attr('type','text').attr('placeholder','Email').appendTo('#payment_split');
      $("<p>").text("or").appendTo("#payment_split");
      $("<button>").attr("id","venmo_friends").text("Select A Friend").appendTo("#payment_split");
      $("#venmo_friends").on('click', function(event){
        $("venmo_friends").hide();
        $.ajax({
          type: 'GET',
          url: 'welcome/venmoid',
          dataType: 'JSON'
        }).done(function(data){
          console.log(data);
          var myId = (data.data.user.id);
          $.ajax({
            type: 'GET',
            url: 'welcome/getvenmofriends',
            dataType: 'JSON',
            data: { user_id: myId }
          }).done(function(data){
            console.log(data);
            $("<div id='venmo_friends'>").appendTo("#payment_split")
              $.each(data.data, function(key, value){
                $("<input type='radio' class='venmoFriendCharged'>").val(value.id).appendTo("#venmo_friends");
                $("<label>").text(value.display_name).appendTo("#venmo_friends");
              });
          });
          if($("input:checked")){
            debugger;
            var newValue = $(".venmoFriendCharged").val()
                  $("#submitEmail").val(newValue)}
          });

      });
      var chargeSubmit = $("<button>").text("Charge!").appendTo('#payment_split');
      $(chargeSubmit).on('click', function(event){
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
