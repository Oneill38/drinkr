class UsersController < ApplicationController
  def show
    @user = User.where(id: params[:id])
  end
end
