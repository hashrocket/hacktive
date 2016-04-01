class RemoveDefaultIdFromGithubFetcher < ActiveRecord::Migration
  def up
    execute <<-SQL
      create sequence github_fetchers_id_seq;

      select setval(
        'github_fetchers_id_seq',
        max(id)
      ) from github_fetchers;

      alter table github_fetchers
        alter column id
          set default nextval('github_fetchers_id_seq'::regclass),
        drop constraint only_one_row;

    SQL
  end

  def down
    execute <<-SQL
      alter table github_fetchers
        alter column id set default 1,
        add constraint only_one_row check (id=1);

      drop sequence github_fetchers_id_seq;
    SQL
  end
end
