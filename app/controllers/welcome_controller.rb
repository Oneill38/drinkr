class WelcomeController < ApplicationController

  def index
    @delivery_user_code = params[:code]
    @venmo_token = params[:access_token]

    # if params[:code]
    #   :json => { delivery_user_code: params[:code] , venmo_token: params[:access_token] }
    # end

    # if params[:access_token]
    #   :json => { delivery_user_code: params[:code] , venmo_token: params[:access_token] }
    # end

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

  def retrieveguestcart
    response = HTTParty.get("http://sandbox.delivery.com/customer/cart/#{params[:merchant_id]}",
      :headers => { "Guest-Token" => params[:guest_token] },
      :query => { :client_id => ENV['DELIVERY_API_DEV_client_id'], :order_type => "pickup"}
    )
    render :json => response
  end

  def third_party_authorize
    response = HTTParty.get("http://sandbox.delivery.com/third_party/authorize",
      :query => { :client_id => ENV['DELIVERY_API_DEV_client_id'],
        :redirect_uri => "http://localhost:3000",
        :response_type => "code",
        :scope => "global" }
    )
    render :json => response.to_json
  end

  def authorize
    binding.pry
  end

end
