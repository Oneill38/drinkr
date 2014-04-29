require 'spec_helper'

describe "visiting the site" do

  describe "a new user visits the hompage" do

    it "can see merchants in area", js: true do
      visit root_path
      fill_in 'search_merchants', with: 'soho'
      find_field('search_merchants').native.send_key("\n")
      expect(page).to have_content "Liquors"
    end

    it "can see drinks from a merchant", js: true do
      visit root_path
      fill_in 'search_merchants', with: 'soho'
      find_field('search_merchants').native.send_key("\n")
      find('#merchant-30782').click
      expect(page).to have_content "Absolut"
    end

  end

end