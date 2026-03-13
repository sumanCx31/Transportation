const TripSvc = require("./tripUpdate.service");

class TripController {
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const storeData = await TripSvc.storeTrip(data);

      const bookedSeats = storeData.trip.seats.filter(
        (seat) => seat.isBooked
      ).length;

      const remainingSeats = 32 - bookedSeats;

      res.json({
        data: {
          storeData,
          remainingSeats
        },
        message: "Trip added successfully",
        status: "success",
        option: null,
      });

    } catch (exception) {
      next(exception);
    }
  }

  updateById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedTrip = await TripSvc.updatedTripById(id, data);

      // Calculate remaining seats
      const bookedSeats = updatedTrip.seats.filter(
        (seat) => seat.isBooked,
      ).length;
      const remainingSeats = 32 - bookedSeats;
      console.log("remainingSeats");

      res.json({
        data: {
          updatedTrip,
          remainingSeats,
        },
        message: "Trip Updated Successfully",
        status: "success",
        option: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

}

const TripCltr = new TripController();
module.exports = TripCltr;
