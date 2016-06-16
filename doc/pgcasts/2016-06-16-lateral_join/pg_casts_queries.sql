select d.id, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from activities
) da on d.id=da.developer_id

group by d.id
order by d.id;

-- What you think you should be able to do
select d.id, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from activities
  limit 5
) da on d.id=da.developer_id

group by d.id
order by d.id;

-- If we know the developer id
select d.id, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from activities
	where developer_id=1
  limit 5
) da on d.id=da.developer_id

group by d.id
order by d.id;

-- How we might try to extend our intuition
select d.id, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from activities
	where developer_id=d.id
  limit 5
) da on d.id=da.developer_id

group by d.id
order by d.id;

-- What you actually have to do
select d.id, to_json(array_agg(da.event_type)) activities
from developers d

join lateral (
  select event_type, developer_id
  from activities
  where developer_id=d.id
  limit 5
) da on d.id=da.developer_id

group by d.id
order by d.id;
