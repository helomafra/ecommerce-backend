exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.integer('id').notNullable().primary();
    table.text('name').notNullable();
    table.integer('price').notNullable();
    table.integer('stock').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('products');
