#anatomy of a test file
# all tests must have require spec helper at the top

require 'spec_helper'

# all tests have a describe block to let the
# user/coder know what we are about to dive into
# we defining a class to create objects, object have state and behavior
# state is the internal data
# behavior are the methods and actions we perform on that data
class Dog
  def initialize
    @is_alive = true
    @bark_count = 0
  end

  def is_alive
    return @is_alive
  end

  def bark
    @bark_count += 1
    if @bark_count >= 3
      @is_alive = false
    end
  end

end




describe "dog" do
  it "has an electric collar arounds its neck, if it barks three times it will die" do
    #make a dog
    dog1 = Dog.new()
    dog1.bark
    dog1.bark
    dog1.bark
    expect(dog1.is_alive).to be(false)
    #make the dog bark three times
    #check if the dog is alive
  end
end


#within these describe blocks there are more granular tests

# describe block -> each it
# example group -> example
# in side
