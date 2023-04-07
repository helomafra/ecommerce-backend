const { Router } = require('express');
const CartController = require('../controllers/CartController');

const cartsRoutes = Router();

const cartController = new CartController();

cartsRoutes.get('/', cartController.index);
cartsRoutes.post('/:productId', cartController.create);
cartsRoutes.delete('/:productId', cartController.delete);
cartsRoutes.delete('/removeAll/:productId', cartController.deleteAll);

module.exports = cartsRoutes;
