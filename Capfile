require "capistrano/setup"
require "capistrano/deploy"
require "capistrano/bundler"
require "capistrano/passenger"
require "capistrano/rails/assets"
require "capistrano/rails/migrations"
require "capistrano/rvm"
require "whenever/capistrano"

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
