class CreateGithubFetcher < ActiveRecord::Migration
  def up
    # Allow only one row
    execute <<-SQL
      create table github_fetchers(
        id integer primary key default 1,
        last_fetched_at timestamptz not null,
        constraint only_one_row check (id=1)
      );
    SQL
  end

  def down
    execute <<-SQL
      drop table github_fetchers;
    SQL
  end
end
