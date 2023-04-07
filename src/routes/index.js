const { Router } = require('express');
const routes = Router();

const productsRouter = require('./products.routes');
const cartsRouter = require('./carts.routes');
const ordersRouter = require('./orders.routes');

routes.use('/products', productsRouter);
routes.use('/cart', cartsRouter);
routes.use('/orders', ordersRouter);

module.exports = routes;
