require 'spec_helper'


describe "API redirect links" do
  it "should work with delivery.com", :js => true do
    visit root_path
    # find('#deliveryloginlink')
    expect(page).to have_content('Login')
  end

  it "should work with venmo.com" do
    visit root_path
    click_link 'Sign in to Venmo'
    response.should redirect_to('https://api.venmo.com/v1/oauth/authorize?client_id=1702&scope=make_payments%20access_profile%20access_friends')
  end
end
