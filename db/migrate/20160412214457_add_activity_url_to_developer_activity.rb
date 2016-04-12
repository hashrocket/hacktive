class AddActivityUrlToDeveloperActivity < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table developer_activities
        add column activity_url text;
    SQL
  end

  def down
    execute <<-SQL
      alter table developer_activities
        drop column activity_url;
    SQL
  end
end
