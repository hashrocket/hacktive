require 'resque/tasks'
require 'resque/scheduler/tasks'

namespace :resque do
  task 'setup' => :environment do
    Resque.after_fork = Proc.new do |job|
      ActiveRecord::Base.establish_connection
    end
  end

  task :scheduler => :setup
end
