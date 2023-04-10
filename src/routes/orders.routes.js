const { Router } = require('express');
const OrdersController = require('../controllers/OrdersController');

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post('/', ordersController.createOrder);

module.exports = ordersRoutes;
