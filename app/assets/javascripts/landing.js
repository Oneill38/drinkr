var Landing = {

  onReady: function() {
    $("<div>").addClass("merchants").css( { position:'absolute', top: '20%' }).appendTo("body")
    $("<input>").attr( {type:'text', id: 'search_drinks', placeholder: 'enter location'}).css( {position:'absolute', top: '10%', right: '50%' }).appendTo("body");
    $("#search_drinks").on('keyup', function(event){
      if (event.which === 13 || event.keyCode === 13){
        var searchString = $(this).val();
        console.log(searchString);
        $.ajax({
          type: "GET",
          url: "welcome/getlocation",
          dataType: "json",
          data: {search: searchString}
        }).done(function(data){
          var latitude = data.latitude;
          var longitude = data.longitude;
          $.ajax({
            type: "GET",
            url: "welcome/getmerchants",
            dataType: "json",
            data: { latitude: latitude, longitude: longitude }
          }).done(function(data){
            console.log(data);
            data.merchants.forEach(function(merchant){
              addMerchant(merchant);
            });
          });
        });
      }
    });

  }

}

$(document).ready(Landing.onReady);


 function addMerchant(merchant){
    var merchantArticle = $("<article>").addClass("merchant").attr('id','merchant-'+merchant.id);
    var header = $("<header>").appendTo(merchantArticle);
    $("<h1>").text(merchant.summary.name).appendTo(header);
    var section = $("<section>").appendTo(merchantArticle);
    $("<p>").text(merchant.summary.phone).appendTo(section);
    $("<p>").text('Rating: ' + merchant.summary.overall_rating + " based on " + merchant.summary.num_ratings + " ratings" ).appendTo(section);
    $("<p>").text('Distance: ' + merchant.location.distance).appendTo(section);
    $("<p>").text(merchant.location.street).appendTo(section);
    // $("<p>").text(merchant.summary.description).appendTo(section);
    merchantArticle.appendTo(".merchants");
  }