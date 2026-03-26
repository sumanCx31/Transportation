const TripModel = require("../tripUpdation/tripUpdate.model");

class searchService {
searchByRoute = async (data) => {
    const { date, from, to } = data;

    try {
      // Create a range for the entire day
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const trips = await TripModel.find({
        // Use regex for 'from' and 'to' to make it case-insensitive
        from: { $regex: new RegExp(`^${from.trim()}$`, "i") },
        to: { $regex: new RegExp(`^${to.trim()}$`, "i") },
        // Find any trip where the date falls within this 24-hour window
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        },
      }).populate("bus", "name busNumber");

      if (!trips || trips.length === 0) {
        // Use a standard object structure for the error
        throw {
          status: 404,
          message: "Not found trip on this date or route!!",
          data: { status: "NOT_FOUND_TRIP" },
        };
      }

      return trips;
    } catch (exception) {
      throw exception;
    }
  };
}

const searchSvc = new searchService();
module.exports = searchSvc;
