const TripModel = require("../tripUpdation/tripUpdate.model");

class searchService {
  searchByRoute = async (data) => {
  const { date, from, to } = data;

  try {
    const trips = await TripModel.find({
      from: from,
      to: to,
      date: date,
    }).populate("bus", "name busNumber"); // populate bus details

    if (trips.length === 0) {
      throw {
        code: 404,
        message: "Not found trip on this date or route!!",
        status: "NOT_FOUND_TRIP",
      };
    }

    return trips;
  } catch (exception) {
    throw exception;
  }
}
}

const searchSvc = new searchService();
module.exports = searchSvc;
