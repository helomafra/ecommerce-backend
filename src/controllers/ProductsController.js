const knex = require('../database/knex');

class ProductsController {
  async index(request, response) {
    const products = await knex('products').orderBy('name');

    return response.json(products);
  }

  async search(request, response) {
    const { title } = request.query;

    const search = await knex('products').whereLike(
      'products.name',
      `%${title}%`
    );

    return response.json(search);
  }
}

module.exports = ProductsController;
