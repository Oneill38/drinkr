class WelcomeController < ApplicationController

  def index

  end

  def getlocation
    result = Geocoder.search(params[:search])
    latitude = result.first.data["geometry"]["location"]["lat"]
    longitude = result.first.data["geometry"]["location"]["lng"]
    render :json => { latitude: latitude, longitude: longitude}
  end

  def getmerchants
    response = HTTParty.get("https://api.delivery.com/merchant/search/delivery",
      :query => {:client_id => ENV['DELIVERY_API_client_id'],
                        :latitude => params[:latitude],
                        :longitude => params[:longitude],
                        :merchant_type => "W" })
    render :json => response
  end

  def getmenu
    response = HTTParty.get("https://api.delivery.com/merchant/#{params[:merchant_id]}/menu")
    render :json => response
  end

end

response = HTTParty.post('https://sandbox-api.venmo.com/v1/payments',
  :query => { :access_token => ENV['VENMO_ID'],
              :user_id => 145434160922624933,
              :email => 'venmo@venmo.com',
              :note => 'it is complete',
              :amount => 0.10})



