require 'spec_helper'

describe "login" do
  it "should let a user create an account" do
    visit '/users/sign_up'
    click_on 'Sign up'
    fill_in 'Email', with: "me@me.com"
    fill_in 'Password', with: "lalalala"
    fill_in 'Password confirmation', with: "lalalala"
    click_button 'Sign up'
    expect(page).to have_content('Hi')
  end




end


