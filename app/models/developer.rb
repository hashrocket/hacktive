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

#------------------------------------------------------------------------------
# Developer
#
# Name SQL Type             Null    Default Primary
# ---- -------------------- ------- ------- -------
# id   integer              false           true   
# name text                 false           false  
#
#------------------------------------------------------------------------------
