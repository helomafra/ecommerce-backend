exports.up = (knex) =>
  knex.schema.createTable('orders_products', (table) => {
    table.integer('order_id').references('id').inTable('orders');
    table.integer('product_id').references('id').inTable('products');
    table.integer('qty').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('orders_products');
