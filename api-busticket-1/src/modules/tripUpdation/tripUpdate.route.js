const TripUpdateRouter = require("express").Router();
const bodyValidator = require("../../middlewares/request-validate.middleware");
const TripCltr = require("./tripUpdate.controller");
const TripModel = require("./tripUpdate.model");
const { TripValidateDTO } = require("./tripUpdate.validator");

TripUpdateRouter.post("/", bodyValidator(TripValidateDTO), TripCltr.create);
TripUpdateRouter.get("/:id", TripCltr.getTripById);
TripUpdateRouter.patch("/seat-reserve/:id",TripCltr.seatReservation)
TripUpdateRouter.put(
  "/:id",
  bodyValidator(TripValidateDTO),
  TripCltr.updateById,
);
TripUpdateRouter.get("/bus/:id", TripCltr.getTripByBusId);

module.exports = TripUpdateRouter;
