# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path("../config/application", __FILE__)

Rails.application.load_tasks

Rake::Task["db:migrate"].enhance do
  if Rails.env.development?
    Rake::Task["annotate:models"].invoke
  end
end

begin
  task("default").clear

  task :default do
    Dir.chdir(File.expand_path("../test", __FILE__))

    task("spec").invoke
  end
rescue LoadError
  # no rspec available
end
