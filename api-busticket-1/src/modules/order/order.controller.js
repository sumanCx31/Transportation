const { default: axios } = require("axios");
const OrderModel = require("./order.model");
const orderSvc = require("./order.service");
const { createOrderValidator } = require("./order.validator");
const { AppConfig, PaymentConfig } = require("../../config/config");

class orderController {
  createOrder = async (req, res) => {
    try {
      // 🔹 If valid → proceed
      const data = req.body;
      const order = await orderSvc.create(data);

      res.status(201).json({
        message: "Order created successfully",
        data: order,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server error",
      });
    }
  };

  initiatePayment = async (req, res) => {
    try {
      const _id = req.params.orderId;
      const data = req.body;
      // console.log(data.user);
      
      const orderDetail = await orderSvc.getSingleRowByFilter(_id);

      console.log(orderDetail);
      
      if (!orderDetail) {
        throw {
          code: 422,
          message: "Order Not Found!!",
          status: "ORDER_NOT_FOUND",
        };
      }
const response = await fetch(
  PaymentConfig.khalti.url + "epayment/initiate/",
  {
    method: "POST",
    body: JSON.stringify({
      return_url: AppConfig.frontendUrl + "/payment?success=true",
      website_url: AppConfig.frontendUrl,
      amount: orderDetail[0].totalAmount * 100, // ✅ FIXED
      purchase_order_id: orderDetail[0]._id.toString(), // ✅ FIXED
      purchase_order_name: "E-Payment Purchase",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Key " + PaymentConfig.khalti.secretKey,
    },
  }
);

      res.json({
        data: await response.json(),
        message: "Payment Initiate",
        status: "PAYMENT_INITIATE",
        option: null,
      });
    } catch (exception) {
      throw exception;
    }
  };
}

const orderCltr = new orderController();
module.exports = orderCltr;
