exports.up = (knex) =>
  knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.text('user_name').notNullable();
    table.date('delivery_date').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('orders');
