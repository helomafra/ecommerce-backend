exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.integer('id').notNullable().primary();
    table.text('name').notNullable();
    table.decimal('price').notNullable();
    table.integer('stock').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('products');
