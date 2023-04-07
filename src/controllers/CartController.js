const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');

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
    const database = await sqliteConnection();

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
      //ajustar essa parte pra fazer com o knex
      await database.run(
        'INSERT INTO cart (product_id, amount) VALUES (?, ?)',
        [productId, 1]
      );

      // await knex('cart').insert({
      //   product_id: Number(productId),
      //   amount: 1
      // });
    }

    return response.json();
  }

  async delete(request, response) {
    const database = await sqliteConnection();
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
        await database.run('DELETE FROM cart WHERE id = ?', [cartItem.id]);

        // await knex('cart')
        //   .where({ id: cartItem.id })
        //   .delete(['id', 'product_id', 'amount']);
      }
    }

    return response.json();
  }

  async deleteAll(request, response) {
    const database = await sqliteConnection();
    const { productId } = request.params;

    const product = await knex('cart').where({ product_id: productId }).first();

    if (!product) {
      throw new AppError('Produto não entrado!');
    }

    await database.run('DELETE FROM cart WHERE product_id = ?', [productId]);

    return response.json();
  }
}

module.exports = CartController;
