-- Create developers table
create table developers (
  id integer primary key,
  login text not null
);

-- Generate developers
insert into developers (id, login)
  select dev_id, 'dev' || dev_id
  from generate_series(1, 10) as dev_id;

-- Create event_types table
create table event_types (
  name text primary key
);

-- Generate event types
insert into event_types (name)
  values ('push'), ('pull'), ('fork');

-- Create developer activities table
create table developer_activities (
  id serial primary key,
  developer_id integer not null references developers(id),
  event_type text not null references event_types(name)
);

-- Generate developer activities
with recursive random_activities (row_num, developer_id, event_type) as (
  (
    select 1, d.id, et.name
    from developers d
    cross join event_types et
    order by random() limit 1
  )
  union (
    select row_num+1, d.id, et.name
    from random_activities
    cross join developers d
    cross join event_types et
    where row_num <20
    order by random() limit 1
  )
)

insert into developer_activities (developer_id, event_type)
  select random_activities.developer_id,
  random_activities.event_type from random_activities;
