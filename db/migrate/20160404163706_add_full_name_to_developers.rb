class AddFullNameToDevelopers < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table developers
        rename column name to login;

      alter table developers
        add constraint developers_login_uniq unique (login),
        add column name text;
    SQL
  end

  def down
    execute <<-SQL
      alter table developers
        drop constraint developers_login_uniq,
        drop column name;

      alter table developers
        rename column login to name;
    SQL
  end
end
