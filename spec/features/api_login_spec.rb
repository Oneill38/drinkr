require 'spec_helper'


describe "API redirect links" do
  it "should work with delivery.com", :js => true do
    visit root_path
    # find('#deliveryloginlink')
    expect(page).to have_content('Login')
  end

  it "should work with venmo.com" do
    visit root_path
    expect(page).to have_content('Venmo')
  end
end
