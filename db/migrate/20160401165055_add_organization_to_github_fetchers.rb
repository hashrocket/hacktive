class AddOrganizationToGithubFetchers < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table github_fetchers
        add column organization text,
        add constraint github_fetchers_organization_uniq
          unique (organization);

      update github_fetchers set organization = 'hashrocket';

      alter table github_fetchers
        alter column organization set not null;
    SQL
  end

  def down
    execute <<-SQL
      alter table github_fetchers
        drop column organization;
    SQL
  end
end
