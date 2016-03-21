# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
event_types = [
  'IssuesEvent',
  'PullRequestEvent',
  'PushEvent'
]

event_types.each do |event_type|
  EventType.find_or_create_by(name: event_type)
end


GithubFetcher.create(id: 1)
