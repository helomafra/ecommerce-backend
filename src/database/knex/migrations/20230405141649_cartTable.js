exports.up = (knex) =>
  knex.schema.createTable('cart', (table) => {
    table.increments('id').primary();
    table.integer('product_id').references('id').inTable('products');
    table.integer('amount').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('cart');
