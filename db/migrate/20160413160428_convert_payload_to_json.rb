class ConvertPayloadToJson < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table developer_activities
        alter column payload set data type jsonb using payload::jsonb;
    SQL
  end

  def down
    execute <<-SQL
      create or replace function jsonb_to_hstore(jsonb)
        returns hstore
        immutable
        strict
        language sql
      as $func$
        select hstore(array_agg(key), array_agg(value))
        from jsonb_each_text($1)
      $func$;

      alter table developer_activities
        alter column payload set data type hstore using jsonb_to_hstore(payload);

      drop function jsonb_to_hstore(jsonb);
    SQL
  end
end
