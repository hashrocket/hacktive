class CreateDeveloperActivities < ActiveRecord::Migration
  def up
    execute <<-SQL
      create extension if not exists hstore;

      create table event_types(
        name text not null primary key
      );

      create table developers(
        id integer primary key,
        name text not null
      );

      create table developer_activities (
        id serial primary key,
        payload hstore not null,
        developer_id integer not null references developers(id),
        event_occurred_at timestamptz not null,
        event_id bigint not null,
        event_type text not null references event_types(name),
        repo_name text not null,
        created_at timestamptz not null default now()
      );
    SQL
  end

  def down
    execute <<-SQL
      drop table developer_activities;
      drop table event_types;
      drop table developers;
      drop extension if exists hstore;
    SQL
  end
end
