require 'spec_helper'

describe "signing up process" do
  it "should allow a new user to sign up" do
    visit root_path
    click_link "Sign up"
    fill_in 'Email', with: 'raph@raph.com'
    fill_in 'Password', with: 'raphraph'
    fill_in 'Password confirmation', with: 'raphraph'
    #Given a user who is trying to sign up
    #When he inputs his email and password
    #then he should receive a "thank you for signing up" message
    expect
  end
end
