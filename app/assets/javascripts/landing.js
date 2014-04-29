var Landing = {

  onReady: function() {
    $("<div>").addClass("merchants").css( { position:'absolute', top: '20%' }).appendTo("body")
    $("<div>").addClass("items").css({height: '600px', width: '800px'}).appendTo("body")
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
            var offset = (window.innerWidth * -1) + 600 ;
            data.merchants.forEach(function(merchant){
              offset += window.innerWidth;
              addMerchant(merchant, offset);
            });
          });
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 37 || event.keyCode === 37){
        $(".merchant").map(function(index, merchantArticle){
          var leftPosition = parseInt($(merchantArticle).css('left'));
          var newPosition = leftPosition - window.innerWidth;
          $(merchantArticle).css('left', String(newPosition)+"px");
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 39 || event.keyCode === 39){
        $(".merchant").map(function(index, merchantArticle){
          var leftPosition = parseInt($(merchantArticle).css('left'));
          var newPosition = leftPosition+ window.innerWidth;
          $(merchantArticle).css('left', String(newPosition)+"px");
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 38 || event.keyCode === 38){
        $(".merchant").map(function(index, merchantArticle){
          var leftPosition = parseInt($(merchantArticle).css('left'));
          var newPosition = leftPosition - (window.innerWidth / 2) + 350  ;
          $(merchantArticle).css('left', String(newPosition)+"px");
          $(merchantArticle).css('top', "5px");
          $(merchantArticle).css('height', "20%");
          $(merchantArticle).css('width', "100%");
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 40 || event.keyCode === 40){
        $(".merchant").map(function(index, merchantArticle){

        });
      }
    });

    // $("body").css('background-image', 'url(http://www3.pictures.zimbio.com/mp/iS_rUeuh03Vx.jpg)');
    $("body").css('background-size', 'cover');

  }
}



 function addMerchant(merchant, offset){
    var merchantArticle = $("<article>").addClass("merchant").attr('id','merchant-'+merchant.id).css('left', String(offset)+'px');
    var header = $("<header>").appendTo(merchantArticle);
    $("<h1>").text(merchant.summary.name).appendTo(header);
    var section = $("<section>").appendTo(merchantArticle);
    $("<p>").text(merchant.summary.phone).appendTo(section);
    $("<p>").text('Rating: ' + merchant.summary.overall_rating + " based on " + merchant.summary.num_ratings + " ratings" ).appendTo(section);
    $("<p>").text('Distance: ' + merchant.location.distance).appendTo(section);
    $("<p>").text(merchant.location.street).appendTo(section);
    $("<p>").text(merchant.summary.description).appendTo(section);
    merchantArticle.on( "click", function(event) {
      $.ajax({
            type: "GET",
            url: "welcome/getmenu",
            dataType: "json",
            data: { merchant_id: merchant.id }
      }).done(function(data){
        console.log(data);
        data.menu.forEach(function(category){
          console.log(category.name);
          category.children.forEach(function(subcategory){
            console.log(subcategory.name);
            subcategory.children.forEach(function(item){
              addMenuItem(item);
            });
          });
        });
      });
    });
    merchantArticle.appendTo(".merchants");
  }

  function addMenuItem(item){
    var itemArticle = $("<article>").addClass("item").attr('id','item-'+item.id);
    var header = $("<header>").appendTo(itemArticle);
    $("<h1>").text(item.name).appendTo(header);
    var section = $("<section>").appendTo(itemArticle);
    $("<p>").text(item.description).appendTo(section);
    $("<p>").text('Quantity: ' + item.min_qty + " - " + item.max_qty).appendTo(section);
    $("<p>").text(item.price).appendTo(section);
    itemArticle.appendTo(".items");
  }