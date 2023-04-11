const knex = require('../database/knex');

class ProductsController {
  async index(request, response) {
    const products = await knex('products').orderBy('name');

    return response.json(products);
  }
}

module.exports = ProductsController;
