const searchSvc = require("./search.servivce");

const SearchController = async (req, res) => {
  try {
    const data = req.body;
    const trips = await searchSvc.searchByRoute(data);
    console.log(trips)

    res.json({
      data: trips,
      message: "Trips Fetched sucessfuly on this route and date.",
      status: "success",
      option: null,
    });
  } catch (exception) {
    throw exception;
  }
};
module.exports = SearchController;
