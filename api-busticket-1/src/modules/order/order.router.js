const bodyValidator = require('../../middlewares/request-validate.middleware');
const orderCltr = require('./order.controller');
const { createOrderValidator } = require('./order.validator');

const OrderRouter = require('express').Router();

OrderRouter.post("/",bodyValidator(createOrderValidator),orderCltr.createOrder);
OrderRouter.get('/:id', orderCltr.getSingleOrder);
OrderRouter.post("/payment/verify", orderCltr.verifyPayment);

OrderRouter.post("/payment/:orderId",orderCltr.initiatePayment);

OrderRouter.get("/my-tickets/:_id",orderCltr.getMyTickets)
module.exports = OrderRouter;