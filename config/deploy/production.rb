set :host, "54.163.158.72"
set :stage, :production

server fetch(:host), roles: %w{app db web}, user: fetch(:user)

role :app, fetch(:host)
role :db,  fetch(:host)
role :web, fetch(:host)
