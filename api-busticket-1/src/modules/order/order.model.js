const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
    },

    // 🔹 User who booked ticket
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Trip reference
    trip: {
      type: mongoose.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    // 🔹 Seat numbers (multiple seats)
    seats: [
      {
        type: String,
        required: true,
      },
    ],

    // 🔹 Total price
    totalAmount: {
      type: Number,
      required: true,
    },

    // 🔹 Payment status
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    // 🔹 Booking status
    bookingStatus: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },

    // 🔹 Optional payment method
    paymentMethod: {
      type: String,
      enum: ["cash", "khalti", "esewa"],
      default: "cash",
    },

    // 🔹 For audit
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;