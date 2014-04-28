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



end