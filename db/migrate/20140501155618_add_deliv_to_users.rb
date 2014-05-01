class AddDelivToUsers < ActiveRecord::Migration
  def change
    add_column :users, :delivery_token, :string
  end
end
