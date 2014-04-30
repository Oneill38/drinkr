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

// var venmo_functioning = {

//   onReady: function(){
//     $("#venmo_login").on("click", function(event){
//       $.ajax({
//         type: 'GET'

//       });
//     });
// }
