const bodyValidator = require('../../middlewares/request-validate.middleware');
const orderCltr = require('./order.controller');
const { createOrderValidator } = require('./order.validator');

const OrderRouter = require('express').Router();

OrderRouter.post("/",bodyValidator(createOrderValidator),orderCltr.createOrder);
OrderRouter.get('/:id', orderCltr.getSingleOrder);


OrderRouter.post("/payment/:orderId",orderCltr.initiatePayment);
OrderRouter.post("/payment/verify", orderCltr.verifyPayment);
OrderRouter.get("/my-tickets",orderCltr.getMyTickets)
module.exports = OrderRouter;