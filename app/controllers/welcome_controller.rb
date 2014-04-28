class WelcomeController < ApplicationController

  def index

  end

  def getlocation
    result = Geocoder.search(params[:search])
    latitude = result.first.data["geometry"]["location"]["lat"]
    longitude = result.first.data["geometry"]["location"]["lng"]
    render :json => { latitude: latitude, longitude: longitude}
  end

end