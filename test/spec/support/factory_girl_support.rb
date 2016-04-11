require "factory_girl_rails"

RSpec.configure do |config|
  FactoryGirl.definition_file_paths = Dir[File.expand_path("./spec/factories")]
  FactoryGirl.find_definitions
  config.include FactoryGirl::Syntax::Methods
end
