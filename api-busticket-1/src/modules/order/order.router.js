const bodyValidator = require('../../middlewares/request-validate.middleware');
const orderCltr = require('./order.controller');
const { createOrderValidator } = require('./order.validator');

const OrderRouter = require('express').Router();

OrderRouter.post("/",bodyValidator(createOrderValidator),orderCltr.createOrder);



OrderRouter.get("/payment/:orderId",orderCltr.initiatePayment)
module.exports = OrderRouter;