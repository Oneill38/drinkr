require 'spec_helper'

describe "visiting the site" do

  describe "a new user visits the hompage" do

    # it "can see merchants in area", :js => true do
    #   visit root_path
    #   fill_in 'search_merchants', with: 'soho'
    #   find_field('search_merchants').native.send_key(:return)
    #   expect(page).to have_content "Liquors"
    # end

    # it "can see drinks from a merchant", :js => true do
    #   visit root_path
    #   fill_in 'search_merchants', with: 'soho'
    #   find_field('search_merchants').native.send_key(:return)
    #   find('#merchant-30782').native.send_keys(:down)
    #   expect(page).to have_content "Vodka"
    # end

    it "gets a guest token", :js => true do
      visit root_path
      fill_in 'search_merchants', with: 'soho'
      find_field('search_merchants').native.send_key(:return)
      find('#merchant-30782').native.send_keys(:down)
      # within(:css, '#merchant-30782 #item-N292 section') do
      #   click_button('Add to Cart')
      # end
      within(:css, '#merchant-30782 #item-N455 section') do
        click_button('Add to Cart')
      end


      # locate(:css, '#merchant-30782 #item-N292 section').find_button("Add to Cart").click



      # end
      wait_for_ajax
      # expect(page).not_to have_selector('#item_count', text: '0 item(s)')
      expect(page).to have_selector('#item_count', text: '1 item(s)')


      # expect(page).to have_selector(:css, '#item_count', text: '1 item(s)')

# expect(page).to have_button("Add to Cart")


#       find('#item-N292 section button').click
#       # find('#item-N292.item section button').click
#       # click_button 'Add to Cart'
#       # click_button 'Add to Cart'
# #!!!!when we reload page, the cart empties
#       # wait_for_ajax
#       expect(page).to have_selector('#item_count', text: '1 item(s)')
#       # expect(page).not_to have_selector('#item_count', text: '0 item(s)')
    end

  end

end
