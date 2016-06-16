select d.*, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from developer_activities
) da on d.id=da.developer_id

group by d.id
order by d.id;

-- What you think you should be able to do
select d.*, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from developer_activities
  limit 5
) da on d.id=da.developer_id

group by d.id
order by d.id;

-- What you actually have to do
select d.*, to_json(array_agg(da.event_type)) activities
from developers d

join lateral (
  select event_type, developer_id
  from developer_activities
  where developer_id=d.id
  limit 5
) da on d.id=da.developer_id

group by d.id
order by d.id;
