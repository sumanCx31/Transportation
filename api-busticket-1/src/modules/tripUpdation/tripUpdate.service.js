const { generateSeats } = require("../../utilities/helper");
const TripModel = require("./tripUpdate.model");

class TripService {
  storeTrip = async (data) => {
    const seats = generateSeats();
    data.seats = seats;

    const trip = await TripModel.create(data);

    const tripDate = new Date(data.date);

    return {
      trip,
      fullDate: {
        year: tripDate.getFullYear(),
        month: tripDate.getMonth() + 1,
        day: tripDate.getDate(),
      },
    };
  };

  searchTripById = async (id) => {
    const trip = await TripModel.findById(id);

    if (!trip) {
      throw { message: "Trip Not Found" };
    }

    return trip;
  };

  updatedTripById = async (id, data) => {
    try {
      const trip = await TripModel.findById(id);
      if (!trip) throw new Error("Trip not found");

      // update basic fields
      trip.bus = data.bus || trip.bus;
      trip.from = data.from || trip.from;
      trip.to = data.to || trip.to;
      trip.departureTime = data.departureTime || trip.departureTime;
      trip.arrivalTime = data.arrivalTime || trip.arrivalTime;
      trip.price = data.price || trip.price;
      trip.status = data.status || trip.status;
      trip.date = data.date || trip.date;

      // update seat bookings
      if (data.seats && Array.isArray(data.seats)) {
        data.seats.forEach((seatInput) => {
          const seat = trip.seats.find(
            (s) => s.seatNumber === seatInput.seatNumber,
          );
          if (seat) {
            seat.isBooked = seatInput.isBooked;
          }
        });
      }

      await trip.save();

      return trip;
    } catch (exception) {
      throw exception;
    }
  };
}

const TripSvc = new TripService();
module.exports = TripSvc;
