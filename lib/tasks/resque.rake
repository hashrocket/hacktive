require 'resque/tasks'

task "resque:setup" => :environment do
  Resque.after_fork = Proc.new do |job|
    ActiveRecord::Base.establish_connection
  end
end
