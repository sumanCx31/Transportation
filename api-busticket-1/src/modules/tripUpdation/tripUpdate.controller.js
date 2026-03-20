const TripModel = require("./tripUpdate.model");
const TripSvc = require("./tripUpdate.service");

class TripController {
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const storeData = await TripSvc.storeTrip(data);

      const bookedSeats = storeData.trip.seats.filter(
        (seat) => seat.isBooked,
      ).length;

      const remainingSeats = 32 - bookedSeats;

      res.json({
        data: {
          storeData,
          remainingSeats,
        },
        message: "Trip added successfully",
        status: "success",
        option: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

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

  getTripById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const Trip = await TripSvc.searchTripById(id);

      res.json({
        data: Trip,
        status: "Success",
        messaage: "Trip Data fetched sucessfully!!",
      });
    } catch (exception) {
      throw exception;
    }
  };

  getTripByBusId = async (req, res) => {
    try {
      const busId = req.params.id;
      const trips = await TripModel.find({ bus: busId }).populate("bus");
      if (!trips || trips.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "No trips scheduled for this bus yet.",
        });
      }

      res.json({
        status: "success",
        data: trips,
      });
    } catch (error) {
      // If busId is not a valid 24-char hex string, this catch will trigger
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

const TripCltr = new TripController();
module.exports = TripCltr;
