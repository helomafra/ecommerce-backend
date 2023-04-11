const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class CartController {
  async index(request, response) {
    const cartProducts = await knex('cart')
      .join('products', 'products.id', 'cart.product_id')
      .select(
        'products.id as productId',
        'products.name',
        'products.price',
        'cart.amount'
      );

    return response.json(cartProducts);
  }

  async create(request, response) {
    const { productId } = request.params;

    const product = await knex('products').where({ id: productId }).first();

    if (!product) {
      throw new AppError('Produto não entrado!');
    }

    const cartItem = await knex('cart')
      .where({ product_id: productId })
      .first();

    if (cartItem) {
      await knex('cart')
        .where({ id: cartItem.id })
        .update({
          amount: cartItem.amount + 1
        });
    } else {
      await knex('cart').insert({
        product_id: Number(productId),
        amount: 1
      });
    }

    return response.json();
  }

  async delete(request, response) {
    const { productId } = request.params;

    const product = await knex('cart').where({ product_id: productId }).first();

    if (!product) {
      throw new AppError('Produto não entrado!');
    }

    const cartItem = await knex('cart')
      .where({ product_id: productId })
      .first();

    if (cartItem) {
      if (cartItem.amount > 1) {
        await knex('cart')
          .where({ id: cartItem.id })
          .update({
            amount: cartItem.amount - 1
          });
      } else {
        await knex('cart')
          .where({ id: cartItem.id })
          .delete(['id', 'product_id', 'amount']);
      }
    }

    return response.json();
  }

  async deleteAll(request, response) {
    const { productId } = request.params;

    const product = await knex('cart').where({ product_id: productId }).first();

    if (!product) {
      throw new AppError('Produto não entrado!');
    }

    await knex('cart')
      .where({ product_id: productId })
      .delete(['id', 'product_id', 'amount']);

    return response.json();
  }
}

module.exports = CartController;
