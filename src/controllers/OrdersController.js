const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class OrdersController {
  async createOrder(request, response) {
    const { user_name, delivery_date, products } = request.body;

    if (user_name.length === 0) {
      throw new AppError("O campo 'nome' é obrigatório!");
    }

    if (delivery_date.length === 0) {
      throw new AppError("O campo 'data de entrega' é obrigatório!");
    }

    const today = new Date();
    const convertDeliveryDate = new Date(delivery_date);

    if (convertDeliveryDate <= today) {
      throw new AppError('A data de entrega deve ser uma data futura!');
    }

    if (products.length === 0) {
      throw new AppError('Adicione ao menos um item para finalizar a compra!');
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

    await knex('cart').delete(['id', 'product_id', 'amount']);

    return response.json('Pedido criado com sucesso!');
  }
}

module.exports = OrdersController;
