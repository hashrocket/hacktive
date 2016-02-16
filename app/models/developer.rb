# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class Developer < ActiveRecord::Base
  has_many :developer_activities
end
