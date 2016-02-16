# == Schema Information
#
# Table name: event_types
#
#  name :text             not null, primary key
#

class EventType < ActiveRecord::Base
end

#------------------------------------------------------------------------------
# EventType
#
# Name SQL Type             Null    Default Primary
# ---- -------------------- ------- ------- -------
# name text                 false           true   
#
#------------------------------------------------------------------------------
