const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class OrdersController {
  async createOrder(request, response) {
    const { user_name, delivery_date, products } = request.body;

    const today = new Date();
    console.log(today);
    console.log(delivery_date);

    if (user_name.length === 0) {
      throw new AppError("O campo 'nome' é obrigatório!");
    }

    if (delivery_date.length === 0) {
      throw new AppError("O campo 'data de entrega' é obrigatório!");
    }

    for (let product of products) {
      const [getProduct] = await knex('products').where({
        id: product.productId
      });

      if (getProduct.stock <= 0) {
        throw new AppError(
          `O produto ${getProduct.name} não está mais em estoque`
        );
      }

      if (getProduct.stock < product.amount) {
        throw new AppError(
          `A quantidade solicitada de ${getProduct.name} não está disponível. Temos somente ${getProduct.stock} unidades em estoque. `
        );
      }
    }

    const [order] = await knex('orders').insert({
      user_name,
      delivery_date
    });

    for (let product of products) {
      await knex('orders_products').insert({
        order_id: order,
        product_id: product.productId,
        qty: product.amount
      });

      const [updateProductStock] = await knex('products').where({
        id: product.productId
      });

      await knex('products')
        .where({ id: product.productId })
        .update({
          stock: updateProductStock.stock - product.amount
        });
    }

    return response.json('Pedido criado com sucesso!');
  }
}

module.exports = OrdersController;
