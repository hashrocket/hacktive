job_type :restart_daemons, "cd :path && #{`which monit`} restart all"
set :output, "log/cron_log.log"

every 1.day, at: "5:00 am" do
	# Auto-renew TLS certification
	letsencrypt_bin = `which letsencrypt`
	if letsencrypt_bin != ""
		# Renew TLS certification if possible
		command("#{letsencrypt_bin} renew >> /var/log/le-renew.log")
	end

	# Restart all background processes
  restart_daemons(path: File.expand_path("../../", __FILE__))
end
