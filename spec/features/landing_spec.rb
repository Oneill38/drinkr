require 'spec_helper'

describe "visiting the site" do

  describe "a new user visits the hompage" do

    it "can see merchants in area", :js => true do
      visit root_path
      fill_in 'search_merchants', with: 'soho'
      find_field('search_merchants').native.send_key("\n")
      expect(page).to have_content "Liquors"
    end

    it "can see drinks from a merchant", :js => true do
      visit root_path
      fill_in 'search_merchants', with: 'soho'
      find_field('search_merchants').native.send_key("\n")
      find('#merchant-30782').click
      expect(page).to have_content "Absolut"
    end

    it "gets a guest token", :js => true do
      visit root_path
      fill_in 'search_merchants', with: 'soho'
      find_field('search_merchants').native.send_key("\n")
      find('#merchant-30782').click
      find('#item-N292.item section button').click
      # click_button 'Add to Cart'
      expect(page).to have_selector('#item_count', text: '0 item(s)')
      expect(page).to have_selector('#item_count', text: '1 item(s)')
      # expect(page).not_to have_selector('#item_count', text: '0 item(s)')



    end

  end

end
