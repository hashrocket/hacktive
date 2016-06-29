set :application, "hacktive"
set :repo_url,  "git@github.com:hashrocket/hacktive.git"
set :user, "ubuntu"
set :whenever_identifier, "#{fetch(:application)}_#{fetch(:stage)}"

after "deploy:updating", "deploy:upload_secrets"

namespace :deploy do
	desc "Upload sensiitve files to remote server"
	task :upload_secrets do |t|
		on roles(:all) do |host|
			secrets_dir = File.join("config", "secrets")
			local_env_path = File.join(secrets_dir, "#{fetch(:stage)}", ".env")
			local_monitrc_path = File.join(secrets_dir, "#{fetch(:stage)}", "monitrc")

			upload!(local_env_path, release_path)
			upload!(local_monitrc_path, release_path)
		end
	end
end
