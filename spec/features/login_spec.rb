require 'spec_helper'


describe "Sign Up process" do
  it "should allow a new user to sign up" do
    visit root_path
    click_link "Sign up"
    fill_in 'Email', with: 'raph@raph.com'
    fill_in 'Password', with: 'raphraph'
    fill_in 'Password confirmation', with: 'raphraph'
    click_button 'Sign up'
    expect(page).to have_content('Hi,')
  end

  it "passwords need to be at least 8 characters long" do
    visit root_path
    click_link "Sign up"
    fill_in 'Email', with: 'colin@colin.com'
    fill_in 'Password', with: 'colin'
    fill_in 'Password confirmation', with: 'colin'
    click_button 'Sign up'
    expect(page).to have_content('Password is too short')
  end

  it "restrict sign up with previously used email" do
    visit root_path
    click_link "Sign up"
    fill_in 'Email', with: 'raph@raph.com'
    fill_in 'Password', with: 'raphraph'
    fill_in 'Password confirmation', with: 'raphraph'
    click_button 'Sign up'
    click_on 'Sign out'
    click_link "Sign up"
    fill_in 'Email', with: 'raph@raph.com'
    fill_in 'Password', with: 'raphraph'
    fill_in 'Password confirmation', with: 'raphraph'
    click_button 'Sign up'
# This is actually logging in properly.
# It is not catching that this email has already been used.
    expect(page).to have_content('Email has already been taken')
  end

end

describe "Sign In process" do
   it "should allow a returning user to sign in" do
    visit root_path
    click_link "Sign up"
    fill_in 'Email', with: 'raph@raph.com'
    fill_in 'Password', with: 'raphraph'
    fill_in 'Password confirmation', with: 'raphraph'
    click_button 'Sign up'
    click_on 'Sign out'
    click_link "Sign in"
    fill_in 'Email', with: 'raph@raph.com'
    fill_in 'Password', with: 'raphraph'
    click_on 'Sign in'
    #This isn't sending test to signed in page
    #it is staying on the sign in form page
    expect(page).to have_content('Account')
  end
end
