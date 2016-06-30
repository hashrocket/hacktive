set :host, "52.23.113.14"
set :stage, :production

server fetch(:host), roles: %w{app db web}, user: fetch(:user)

role :app, fetch(:host)
role :db,  fetch(:host)
role :web, fetch(:host)
