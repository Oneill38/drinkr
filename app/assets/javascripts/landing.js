var Landing = {

  onReady: function() {
    $.ajax({
      type: "GET",
      url: "welcome/getguesttoken",
      dataType: "json"
    }).done(function(data){
      guestToken = data;
    });
    $("<a>").attr('href', 'http://sandbox.delivery.com/third_party/authorize?client_id=NmUzODZkMzliOTJhOWI3NDk3YjdlZDM0MzdjMDliM2Zj&redirect_uri=http://localhost:3000&response_type=code&scope=global').attr('id','deliveryloginlink').text("Login with Delivery.com").appendTo("body");
    $("<div>").addClass("basket").css( { position:'fixed', top: '3%', right: '3%', height: '100px', width: '200px'} ).appendTo("body");
    $("<p>").attr( 'id' , 'item_count' ).text("0 item(s)").appendTo(".basket");
    $("<p>").attr( 'id' , 'subtotal' ).text("0.00 subtotal").appendTo(".basket");
    $("<div>").addClass("merchants").css( { position:'absolute', top: '20%' }).appendTo("body");
    $("<input>").attr( {type:'text', id: 'search_merchants', placeholder: 'enter location'}).css( {position:'fixed', top: '4%', right: '50%' }).appendTo("body");
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
            console.log(data)
            current_merchant_index = 0;
            var offset = -50;
            data.merchants.forEach(function(merchant){
              offset += 100;
              addMerchant(merchant, offset);
            });
          });
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 37 || event.keyCode === 37){
        current_merchant_index += 1;
        if (current_merchant_index < 0){
          current_merchant_index = 0;
        } else if (current_merchant_index > $(".merchant").size()){
          current_merchant_index = $(".merchant").size();
        }
        $(".merchant").map(function(index, merchantArticle){
          var newPosition = ((index - current_merchant_index)*100)+50;
          $(merchantArticle).css('left', String(newPosition)+"%");
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 39 || event.keyCode === 39){
        current_merchant_index -= 1;
        if (current_merchant_index < 0){
          current_merchant_index = 0;
        } else if (current_merchant_index > $(".merchant").size()){
          current_merchant_index = $(".merchant").size();
        }
        $(".merchant").map(function(index, merchantArticle){
          var newPosition = ((index - current_merchant_index)*100)+50;
          $(merchantArticle).css('left', String(newPosition)+"%");
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 38 || event.keyCode === 38){
        $.ajax({
          type: "GET",
          url: "welcome/retrieveguestcart",
          dataType: "json",
          data: { merchant_id: $(".basket").attr('merchant_id'), guest_token: guestToken }
        }).done(function(data){
          console.log(data);
          $(".basket").css({width: '250px', height: '400px'});
          $(".basket").text("");
          data.cart.forEach(function(item){
            addBasketItem(item);
          });
          $("<p>").attr( 'id' , 'item_count' ).text(data.item_count+" item(s)").appendTo(".basket");
          $("<p>").attr( 'id' , 'subtotal' ).text(data.subtotal+" subtotal").appendTo(".basket");
          $("<p>").attr( 'id' , 'tax' ).text( data.tax + " tax").appendTo(".basket");
          $("<p>").attr( 'id' , 'total' ).text( data.total +" total").appendTo(".basket");
          $("<button>").text("Checkout").appendTo(".basket");
          $("<button>").attr('id','venmo_split').text("Split using Venmo!").appendTo(".basket");
          venmoFunctioning.onReady();
        });
      }
    });

    $("body").on('keyup', function(event){
      if (event.which === 40 || event.keyCode === 40){
        var merchant_index = $(".merchant").eq(current_merchant_index).attr('id').replace('merchant-', '');
        var expanded = $(".merchant").eq(current_merchant_index).find("input[id=expanded]").val();
        if (expanded==="false"){
          $(".merchant").eq(current_merchant_index).css({ top: '30%', left: '30%', width: '60%', height: '80%'});
          $.ajax({
            type: "GET",
            url: "welcome/getmenu",
            dataType: "json",
            data: { merchant_id: merchant_index }
          }).done(function(data){
            data.menu.forEach(function(category){
              addMenuCategory(category);
              category.children.forEach(function(subcategory){
                addMenuSubCategory(subcategory);
                subcategory.children.forEach(function(item){
                  addMenuItem(item, merchant_index);
                });
              });
            });
          });
          $(".merchant").eq(current_merchant_index).find("input[id=expanded]").val(true);
        }
      }
    });

    $("body").css('background-image', 'url(http://www3.pictures.zimbio.com/mp/iS_rUeuh03Vx.jpg)');
    $("body").css('background-size', 'cover');
  }
}



 function addMerchant(merchant, offset){
    var merchantArticle = $("<article>").addClass("merchant").attr('id','merchant-'+merchant.id).css('left', String(offset)+'%');
    var header = $("<header>").appendTo(merchantArticle);
    $("<h1>").text(merchant.summary.name).appendTo(header);
    var section = $("<section>").appendTo(merchantArticle);
    $("<p>").text(merchant.summary.phone).appendTo(section);
    $("<p>").text('Rating: ' + merchant.summary.overall_rating + " based on " + merchant.summary.num_ratings + " ratings" ).appendTo(section);
    $("<p>").text('Distance: ' + merchant.location.distance).appendTo(section);
    $("<p>").text(merchant.location.street).appendTo(section);
    if (merchant.ordering.is_open){
      $("<p>").text("OPEN").appendTo(section);
    } else {
      $("<p>").text("CLOSED").appendTo(section);
    }
    $("<input>").attr('id','open').attr('type','hidden').attr('value',merchant.ordering.is_open).appendTo(section);
    $("<input>").attr('id','expanded').attr('type','hidden').attr('value',false).appendTo(section);
    $("<p>").text(merchant.summary.description).appendTo(section);
    merchantArticle.appendTo(".merchants");
  }

  function addMenuItem(item, merchant_id){
    var itemArticle = $("<article>").addClass("item").attr('id','item-'+item.id);
    var header = $("<header>").appendTo(itemArticle);
    $("<h1>").text(item.name).appendTo(header);
    var section = $("<section>").appendTo(itemArticle);
    $("<p>").text(item.description).appendTo(section);
    var qty = $("<input>").attr('type','text').attr('placeholder','quantity').appendTo(section);
    section.append("<br>" + item.min_qty + " - " + item.max_qty);
    $("<p>").text("$ " + item.price).appendTo(section);
    var button = $("<button>").text('Add to Cart').on( "click", function(event){
      var merchantOpen = $(".merchant").eq(current_merchant_index).find("input[id=open]").val();
      if (merchantOpen === "true"){
        $.ajax({
          type: "POST",
          url: "welcome/addtoguestcart",
          dataType: "json",
          data: { merchant_id: merchant_id, guest_token: guestToken, item_id: item.id, item_qty: 1}
        }).done(function(data){
          console.log(data);
          $("#subtotal").text(data.subtotal+" subtotal");
          $("#item_count").text(data.item_count +" item(s)");
          $(".basket").attr( "merchant_id", merchant_id );
        });
      }
    });
    button.appendTo(section);
    itemArticle.appendTo($(".merchant").eq(current_merchant_index));
  }

  function addMenuCategory(category){
    var categoryArticle = $("<article>").addClass("category").attr('id','category-'+category.id);
    var header = $("<header>").appendTo(categoryArticle);
    $("<h1>").text(category.name).appendTo(header);
    categoryArticle.appendTo($(".merchant").eq(current_merchant_index));
  }

  function addMenuSubCategory(subcategory){
    var subcategoryArticle = $("<article>").addClass("subcategory").attr('id','subcategory-'+subcategory.id);
    var header = $("<header>").appendTo(subcategoryArticle);
    $("<h1>").text(subcategory.name).appendTo(header);
    subcategoryArticle.appendTo($(".merchant").eq(current_merchant_index));
  }

  function addBasketItem(item){
    $("<p>").attr( 'id' , item.id ).text(item.name + " " + item.price + " " + item.quantity).appendTo(".basket");
  }
