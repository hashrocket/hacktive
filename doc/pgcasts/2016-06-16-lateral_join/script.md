###Intro:

Hello! My name is Vidal Ekechukwu, and in this episode of PGCasts we’ll be using Lateral Joins to more efficiently aggregate columns. You ready?? Let’s go.

###Video tutorial

Let’s say we have a table of developers

```sql
\d developers;
```

Each developer has an id as its primary key and a username.

We also have a table of developer activities.

```sql
\d activities;
```

Looking at its structure here and at some dummy data, we'll see that each activity references both a developer and an event type.

```sql
table activities;
```

All you devs out there will quickly recognize that this is a short list of the actions you can perform on Github.

You can find details about how I set up the data in the show notes below, but for now, we're going to dive right into dissecting them.

Let's say for each developer, you want an array of his activities' event types with a size no greater than 5.

As you might expect, a simple join, coupled with a group by, and an array_agg will get us mostly there. Let's have a look.

```sql
select d.id, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from activities
) da on d.id=da.developer_id

group by d.id
order by d.id;
```

This is a good start, but as we said, we want at most 5 of each developer's activities in the array. So how do we do that?

Now, you might think that you could just throw a `limit 5` clause in the join subquery, call it a day, and go pour yourself a glass of lemonade. Oh but you'd be soo WRONG!
Let's see what happens if you try that.

```sql
select d.id, array_agg(da.event_type) activities
from developers d

join (
  select event_type, developer_id
  from activities
  limit 5
) da on d.id=da.developer_id

group by d.id
order by d.id;
```

Notice something fishy?? Are your postgres senses tingling?? Well they should be. If you look closely, you'll notice a couple things. First, we're not getting back all the developers who returned an activities array in our first query. Secondly, of the developers that ARE coming back, we're not getting ANYWHERE near the desired activities count.

The reason this happens is because of the limit clause. As Postgres iterates over each developer, it ONLY looks at the first five of ALL activities and returns a row ONLY if the developer's id happens to match one of those five activities' developer_id.

What we really want Postgres to do is to apply the limit NOT to all activities, but ONLY activities whose developer_id matches the current developer's id. For instance, if we only cared about one developer, we could do something as simple as adding a where clause to the join subquery like this:

```sql
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
```

This is great, but now we only get one row...for one developer. How do we do this for every developer?

Maybe we can change the where equivalence statement from developer_id=1 to developer_id=d.id. Let's see what happens:

```sql
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
```

Egggghhhhhhhh. That didn't work. Postgres yells at us for not having access to the d alias inside the join subquery.

This is where the `lateral` keyword comes into play. Watch what happens when we put it right before the join subquery.

```sql
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
```

Tada!! We get what we want. We see a list of all the developers who have activities, AND we see the ones that have up to five! But wait, what happened?

As it turns out, the `lateral` keyword gives us access to the columns provided by the preceding `from` item, which, in this case, is the current developer. We take that developer's id and use it to limit the activities before trying to join the two tables.

There are some other clever ways to achieve this without using the `lateral` keyword. They may employ `common table expressions` or `window functions`, but we won't cover those in this episode. If you're able to use these tools to achieve the same result, hit us up, and we may include it in a future episode.

Until then, thanks for watching, and please leave feedback in the comments below.
