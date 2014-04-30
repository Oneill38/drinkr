var Landing = {

  onReady: function() {
    $.ajax({
      type: "GET",
      url: "welcome/getguesttoken",
      dataType: "json"
    }).done(function(data){
      guestToken = data;
    });
    $("<div>").addClass("basket").css( { position:'fixed', top: '3%', right: '3%', height: '100px', width: '200px'} ).appendTo("body");
    $("<p>").attr( 'id' , 'item_count' ).text("0 item(s)").appendTo(".basket");
    $("<p>").attr( 'id' , 'subtotal' ).text("0.00 subtotal").appendTo(".basket");
    $("<div>").addClass("merchants").css( { position:'absolute', top: '20%' }).appendTo("body");
    $("<div>").addClass("items").css({height: '600px', width: '800px'}).appendTo("body");
    $("<input>").attr( {type:'text', id: 'search_merchants', placeholder: 'enter location'}).css( {position:'absolute', top: '10%', right: '50%' }).appendTo("body");
    $("#search_merchants").on('keyup', function(event){
      if (event.which === 13 || event.keyCode === 13){
        var searchString = $(this).val();
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

    $("body").css('background-image', 'url(http://www3.pictures.zimbio.com/mp/iS_rUeuh03Vx.jpg)');
    $("body").css('background-size', 'cover');

    $(".basket").on( 'click' , function(event){
      $.ajax({
        type: "GET",
        url: "welcome/retrieveguestcart",
        dataType: "json",
        data: { merchant_id: $(".basket").attr('merchant_id'), guest_token: guestToken }
      }).done(function(data){
        console.log(data);
        $(".basket").css({width: '300px', height: '400px'});
        $(".basket").text("");
        data.cart.forEach(function(item){
          addBasketItem(item);
        });
        $("<p>").attr( 'id' , 'item_count' ).text(data.item_count+" item(s)").appendTo(".basket");
        $("<p>").attr( 'id' , 'subtotal' ).text(data.subtotal+" subtotal").appendTo(".basket");
        $("<p>").attr( 'id' , 'tax' ).text( data.tax + " tax").appendTo(".basket");
        $("<p>").attr( 'id' , 'total' ).text( data.total +" total").appendTo(".basket");
        $("<button>").text("Checkout").appendTo(".basket");
      });
    });

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
      $(".items").text("");
      $.ajax({
        type: "GET",
        url: "welcome/getmenu",
        dataType: "json",
        data: { merchant_id: merchant.id }
      }).done(function(data){
        data.menu.forEach(function(category){
          addMenuCategory(category);
          category.children.forEach(function(subcategory){
            addMenuSubCategory(subcategory);
            subcategory.children.forEach(function(item){
              addMenuItem(item, merchant.id);
            });
          });
        });
      });
    });
    merchantArticle.appendTo(".merchants");
  }

  function addMenuItem(item, merchant_id){
    var itemArticle = $("<article>").addClass("item").attr('id','item-'+item.id);
    var header = $("<header>").appendTo(itemArticle);
    $("<h1>").text(item.name).appendTo(header);
    var section = $("<section>").appendTo(itemArticle);
    $("<p>").text(item.description).appendTo(section);
    $("<p>").text('Quantity: ' + item.min_qty + " - " + item.max_qty).appendTo(section);
    $("<p>").text(item.price).appendTo(section);
    var button = $("<button>").text('Add to Cart').on( "click", function(event){
      $.ajax({
        type: "POST",
        url: "welcome/addtoguestcart",
        dataType: "json",
        data: { merchant_id: merchant_id, guest_token: guestToken, item_id: item.id, item_qty: 1}
      }).done(function(data){
        $("#subtotal").text(data.subtotal+" subtotal");
        $("#item_count").text(data.item_count +" item(s)");
        $(".basket").attr( "merchant_id", merchant_id );
      });
    });
    button.appendTo(section);
    itemArticle.appendTo(".items");
  }

  function addMenuCategory(category){
    var categoryArticle = $("<article>").addClass("category").attr('id','category-'+category.id);
    var header = $("<header>").appendTo(categoryArticle);
    $("<h1>").text(category.name).appendTo(header);
    categoryArticle.appendTo(".items");
  }

  function addMenuSubCategory(subcategory){
    var subcategoryArticle = $("<article>").addClass("subcategory").attr('id','subcategory-'+subcategory.id);
    var header = $("<header>").appendTo(subcategoryArticle);
    $("<h1>").text(subcategory.name).appendTo(header);
    subcategoryArticle.appendTo(".items");
  }

  function addBasketItem(item){
    $("<p>").attr( 'id' , item.id ).text(item.name + " " + item.price + " " + item.quantity).appendTo(".basket");

  }