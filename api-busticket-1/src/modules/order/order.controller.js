const axios = require("axios");
const mongoose = require("mongoose");

const OrderModel = require("./order.model");
const TripModel = require("../tripUpdation/tripUpdate.model");
const orderSvc = require("./order.service");

const { PaymentConfig, AppConfig } = require("../../config/config");

class OrderController {
  // 🔹 Create Order (already working, kept clean)
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
      res.status(err.status || 500).json({
        message: err.message || "Server error",
      });
    }
  };

  // 🔹 Get Single Order
  getSingleOrder = async (req, res) => {
    try {
      const _id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
          message: "Invalid order ID",
        });
      }

      const order = await OrderModel.findById(_id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.status(200).json({
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  };

  // 🔹 INITIATE PAYMENT
 // 🔹 INITIATE PAYMENT
initiatePayment = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // 1. Find the order
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2. Call Khalti initiate API
    const response = await fetch(PaymentConfig.khalti.url + "epayment/initiate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${PaymentConfig.khalti.secretKey}`,
      },
      body: JSON.stringify({
        return_url: `${AppConfig.frontendUrl}/payment-success`, // frontend success page
        website_url: AppConfig.frontendUrl,
        amount: order.totalAmount * 100, // Khalti expects paisa
        purchase_order_id: order._id.toString(),
        purchase_order_name: "Bus Ticket Booking",
      }),
    });

    const data = await response.json();

    // 3. Save pidx in order document
    if (data.pidx) {
      order.pidx = data.pidx;
      order.paymentMethod = "khalti";
      await order.save(); // ✅ saves pidx in DB
    } else {
      return res.status(500).json({ message: "Payment initiation failed" });
    }

    // 4. Return the payment URL to frontend
    res.json({
      status: "PAYMENT_INITIATE",
      message: "Payment initiated",
      data: {
        pidx: data.pidx,
        payment_url: `https://test-pay.khalti.com/?pidx=${data.pidx}`,
      },
    });
  } catch (error) {
    console.error("Payment Initiation Error:", error);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};

  // 🔹 VERIFY PAYMENT (FINAL SAFE VERSION)
 verifyPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    // if (!pidx) {
    //   return res.status(400).json({ message: "pidx is required" });
    // }

    // 1️⃣ Find the order by pidx
    const order = await OrderModel.findOne({ pidx });

    if (!order) {
      return res.status(404).json({ message: "Order not found for this payment" });
    }

    // 2️⃣ Prevent duplicate verification
    if (order.paymentStatus === "paid") {
      return res.status(200).json({ message: "Payment already verified", status: "ALREADY_VERIFIED" });
    }

    // 3️⃣ Call Khalti lookup API
    const { data: khaltiData } = await axios.post(
      `${PaymentConfig.khalti.url}epayment/lookup/`,
      { pidx },
      {
        headers: {
          Authorization: `Key ${PaymentConfig.khalti.secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Khalti Response:", khaltiData);

    // 4️⃣ Validate Khalti response
    if (!khaltiData || khaltiData.status !== "Completed") {
      order.paymentStatus = "failed";
      await order.save();
      return res.status(400).json({ message: `Payment not completed: ${khaltiData.status || "Unknown"}`, data: khaltiData });
    }

    if (khaltiData.total_amount !== order.totalAmount * 100) {
      order.paymentStatus = "failed";
      await order.save();
      return res.status(400).json({ message: "Payment amount mismatch", data: khaltiData });
    }

    // 5️⃣ Update order as paid
    order.paymentStatus = "paid";
    order.transactionId = khaltiData.transaction_id;
    await order.save();

    // 6️⃣ Update trip seats
    await TripModel.updateOne(
      { _id: order.trip },
      {
        $set: {
          "seats.$[elem].isBooked": true,
          "seats.$[elem].reservedBy": order.user,
          "seats.$[elem].reservedAt": new Date(),
        },
      },
      {
        arrayFilters: [{ "elem.seatNumber": { $in: order.seats } }],
      }
    );

    return res.status(200).json({ message: "Payment verified successfully", status: "SUCCESS" });

  } catch (error) {
    console.error("Verification Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Verification failed", error: error.response?.data || error.message });
  }
};

  // 🔹 Get My Tickets
 getMyTickets = async (req, res) => {
  try {
    const pidx = req.params._id;

const orderDetail = await OrderModel.find({ pidx })
      .select("trip user seats") // only required fields from Order
      .populate({
        path: "trip",
        select: "from to date seats", // only trip name
      })
      .populate({
        path: "user",
        select: "name", // only user name
      });

    // Optional: format response (clean structure)
    const formatted = orderDetail.map((order) => ({
      from: order.trip?.from,
      to: order.trip?.to,
      userName: order.user?.name,
      seats: order?.seats,
      date: order.trip?.date,
    }));

    res.json({
      data: formatted,
      message: "Tickets retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
}

module.exports = new OrderController();