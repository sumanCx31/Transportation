const TripModel = require("../tripUpdation/tripUpdate.model");

class BookingController {
BookTicket = async (req, res) => {
  const { busId, routeId, seats, userId } = req.body;
  const seatNumbers = seats.map(s => s.seatNumber);

  try {
    // 1. Try to perform the atomic update
    const result = await TripModel.updateOne(
      { _id: routeId, "seats.seatNumber": { $in: seatNumbers }, "seats.isBooked": false },
      { 
        $set: { 
          "seats.$[elem].isBooked": true, 
          "seats.$[elem].status": "pending",
          "seats.$[elem].reservedBy": userId,
          "seats.$[elem].reservedAt": new Date() 
        } 
      },
      { arrayFilters: [{ "elem.seatNumber": { $in: seatNumbers } }] }
    );

    // 2. If no modification, check if they are already held by THIS user
    if (result.modifiedCount === 0) {
      const trip = await TripModel.findOne({ _id: routeId });
      const myHeldSeats = trip.seats.filter(s => 
        seatNumbers.includes(s.seatNumber) && 
        s.reservedBy === userId && 
        s.status === "pending"
      );

      if (myHeldSeats.length === seatNumbers.length) {
        return res.status(200).json({ message: "You already have these seats on hold. Proceed to payment." });
      }

      return res.status(409).json({ message: "Seats are already taken by someone else!" });
    }
    
    res.status(200).json({ message: "Seats held for 5 minutes. Proceed to payment." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
}

const bookcltr = new BookingController();
module.exports = bookcltr
