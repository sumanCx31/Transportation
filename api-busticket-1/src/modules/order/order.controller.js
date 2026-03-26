const { default: axios } = require("axios");
const mongoose = require("mongoose"); // ✅ Added this to fix ReferenceError
const OrderModel = require("./order.model");
const orderSvc = require("./order.service");
const { createOrderValidator } = require("./order.validator");
const { AppConfig, PaymentConfig } = require("../../config/config");
const TripModel = require("../tripUpdation/tripUpdate.model");

class orderController {
  createOrder = async (req, res) => {
    try {
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

getSingleOrder = async (req, res) => {
  const _id=req.params.id;
    const order = await OrderModel.findOne({_id});
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ data: order });
};

  initiatePayment = async (req, res) => {
    try {
      const _id = req.params.orderId;
      const orderDetail = await orderSvc.getSingleRowByFilter(_id);

      if (!orderDetail || orderDetail.length === 0) {
        return res.status(422).json({
          message: "Order Not Found!!",
          status: "ORDER_NOT_FOUND",
        });
      }

      const response = await fetch(
        PaymentConfig.khalti.url + "epayment/initiate/",
        {
          method: "POST",
          body: JSON.stringify({
            return_url: AppConfig.frontendUrl + "/payment/verify",
            website_url: AppConfig.frontendUrl,
            amount: orderDetail[0].totalAmount * 100,
            purchase_order_id: orderDetail[0]._id.toString(),
            purchase_order_name: "E-Payment Purchase",
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Key " + PaymentConfig.khalti.secretKey,
          },
        },
      );

      res.json({
        data: await response.json(),
        message: "Payment Initiate",
        status: "PAYMENT_INITIATE",
        option: null,
      });
    } catch (exception) {
      res.status(500).json({ message: exception.message });
    }
  };

  verifyPayment = async (req, res) => {
    try {
      const { pidx, purchase_order_id } = req.body;

      // 1. Khalti Lookup
      const response = await fetch(
        `${PaymentConfig.khalti.url}epayment/lookup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Key ${PaymentConfig.khalti.secretKey}`,
          },
          body: JSON.stringify({ pidx }),
        },
      );

      const khaltiData = await response.json();

      if (khaltiData.status === "Completed") {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
          purchase_order_id,
          {
            paymentStatus: "paid",
            transactionId: khaltiData.transaction_id,
            status: "confirmed",
          },
          { returnDocument: "after" },
        );

        if (!updatedOrder) {
          return res.status(404).json({ message: "Order not found." });
        }

        const tripUpdate = await TripModel.updateOne(
          { _id: new mongoose.Types.ObjectId(updatedOrder.trip) },
          {
            $set: {
              "seats.$[elem].isBooked": true,
              "seats.$[elem].reservedBy": updatedOrder.user,
              "seats.$[elem].reservedAt": new Date(),
            },
          },
          {
            arrayFilters: [{ "elem.seatNumber": { $in: updatedOrder.seats } }],
          },
        );

        return res.json({
          data: khaltiData,
          message: "Payment verified and seats officially booked.",
          status: "PAYMENT_SUCCESS",
        });
      } else {
        return res.status(400).json({
          data: khaltiData,
          message: `Payment failed with status: ${khaltiData.status}`,
          status: "PAYMENT_FAILED",
        });
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  };

  getMyTickets = async (req, res) => {
    try {
      const userId = req.authUser._id;

      const tickets = await OrderModel.find({
        userId: userId,
        paymentStatus: "paid",
      }).sort({ createdAt: -1 });

      res.json({
        data: tickets,
        message: "Tickets retrieved successfully",
        status: "SUCCESS",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

const orderCltr = new orderController();
module.exports = orderCltr;
