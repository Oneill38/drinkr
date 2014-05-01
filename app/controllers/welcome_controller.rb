class WelcomeController < ApplicationController

  def index
    if user_signed_in? && params[:code]
      response = HTTParty.post("http://sandbox.delivery.com/third_party/access_token",
        :query => { :client_id => ENV['DELIVERY_API_DEV_client_id'],
          :grant_type => "authorization_code",
          :client_secret => ENV['DELIVERY_API_DEV_secret'],
          :redirect_uri => "http://drink-r.herokuapp.com",
          :code => params[:code]
        }
      )
      current_user.delivery_token = response["access_token"]
      current_user.save
    end

    @delivery_user_code = params[:code]
    $venmo_token = params[:access_token]

  end

  def getlocation
    result = Geocoder.search(params[:search])
    latitude = result.first.data["geometry"]["location"]["lat"]
    longitude = result.first.data["geometry"]["location"]["lng"]
    render :json => { latitude: latitude, longitude: longitude}
  end

  def getmerchants
    response = HTTParty.get("http://sandbox.delivery.com/merchant/search/delivery",
      :query => {:client_id => ENV['DELIVERY_API_DEV_client_id'],
                        :latitude => params[:latitude],
                        :longitude => params[:longitude],
                        :merchant_type => "W" })
    render :json => response
  end

  def getmenu
    response = HTTParty.get("http://sandbox.delivery.com/merchant/#{params[:merchant_id]}/menu")
    render :json => response
  end

  def getguesttoken
    response = HTTParty.get("http://sandbox.delivery.com/customer/auth/guest",
      :query => {
          :client_id => ENV['DELIVERY_API_DEV_client_id']
        })
    render :json => response["Guest-Token"].to_json
  end

  def addtoguestcart
    response = HTTParty.post("http://sandbox.delivery.com/customer/cart/#{params[:merchant_id]}",
      :headers => { "Guest-Token" => params[:guest_token]},
      :query => { :client_id => ENV['DELIVERY_API_DEV_client_id'],
        :item => { :item_id => params[:item_id], :item_qty => params[:item_qty] }
      }
    )
    render :json => response
  end

  def addtocart
    response = HTTParty.post("http://sandbox.delivery.com/customer/cart/#{params[:merchant_id]}",
      :headers => { "authorization" => params[:delivery_token] },
      :query => { :client_id => ENV['DELIVERY_API_DEV_client_id'],
        :item => { :item_id => params[:item_id], :item_qty => params[:item_qty] }
      }
    )
    render :json => response
  end

  def retrieveguestcart
    response = HTTParty.get("http://sandbox.delivery.com/customer/cart/#{params[:merchant_id]}",
      :headers => { "Guest-Token" => params[:guest_token] },
      :query => { :client_id => ENV['DELIVERY_API_DEV_client_id'], :order_type => "pickup"}
    )
    render :json => response
  end

  def retrieveusercart
    response = HTTParty.get("http://sandbox.delivery.com/customer/cart/#{params[:merchant_id]}",
      :headers => { "authorization" => params[:delivery_token] },
      :query => { :client_id => ENV['DELIVERY_API_DEV_client_id'], :order_type => "pickup"}
    )
    render :json => response
  end

  def getpayment
    response = HTTParty.get("https://sandbox.delivery.com/customer/cart/#{params[:merchant_id]}/checkout",
      :headers => { "authorization" => params[:delivery_token] }
    )
    render :json => response
  end

  def clearcart
    response = HTTParty.delete("https://sandbox.delivery.com/customer/cart/30782", :headers => {"authorization"=>"W8H1K8xYQPOO3wu229w5VBWFFLVzBtEAxbp8STYq"})
  end

  def placeorder
    response = HTTParty.post("https://sandbox.delivery.com/customer/cart/#{params[:merchant_id]}/checkout",
      :headers => { "authorization" => params[:delivery_token] },
      :query => { :order_type => "pickup",
                        :location_id => params[:location].to_i,
                        :payments => [ { :type => "cash" } ]
      }
    )
    render :json => response
  end

  def createlocation
    response = HTTParty.post("https://sandbox.delivery.com/customer/location",
      :headers => { "authorization" => params[:delivery_token] },
      :query => {
        :street    => "235 Park Ave S",
        :city      => "New York",
        :state     => "NY",
        :zip_code  => "10003",
        :phone     => "555-555-5555"
      }
    )
    render :json => response
  end

  def getlocations
    response = HTTParty.get("https://sandbox.delivery.com/customer/location",
      :headers => { "authorization" => params[:delivery_token] }
    )
    render :json => response
  end

  def makevenmopayment
    amount = "-" + params[:amount]

    if params[:email].include?("@")

      response = HTTParty.post('https://sandbox-api.venmo.com/v1/payments',
       :query => { :access_token => $venmo_token,
                   :email => params[:email],
                   :note => params[:note],
                   :amount => amount})
    else
      response = HTTParty.post('https://sandbox-api.venmo.com/v1/payments',
       :query => { :access_token => $venmo_token,
                   :user_id => params[:email],
                   :note => params[:note],
                   :amount => amount})
    end


    render :json => response.to_json
  end

  def getvenmofriends
    response = HTTParty.get("https://api.venmo.com/v1/users/#{params[:user_id]}/friends?",
     :query => {:access_token => $venmo_token})

    render :json => response.to_json
  end

  def venmoid
   response = HTTParty.get("https://api.venmo.com/v1/me?",
    :query => {:access_token => $venmo_token })

   render :json => response.to_json
  end

end
