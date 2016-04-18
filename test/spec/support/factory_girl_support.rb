require "factory_girl_rails"

RSpec.configure do |config|
  factories_path = File.expand_path("../../factories", __FILE__)
  FactoryGirl.definition_file_paths = Dir[factories_path]
  FactoryGirl.find_definitions
  config.include FactoryGirl::Syntax::Methods
end
