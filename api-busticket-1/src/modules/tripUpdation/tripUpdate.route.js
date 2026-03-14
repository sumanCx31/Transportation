const TripUpdateRouter = require('express').Router();
const bodyValidator = require('../../middlewares/request-validate.middleware');
const TripCltr = require('./tripUpdate.controller');
const TripModel = require('./tripUpdate.model');
const { TripValidateDTO } = require('./tripUpdate.validator');

TripUpdateRouter.post("/",bodyValidator(TripValidateDTO),TripCltr.create);
TripUpdateRouter.put("/:id",bodyValidator(TripValidateDTO),TripCltr.updateById);
TripUpdateRouter.get("/bus/:busId", async (req, res) => {
  try {
    const trips = await TripModel.find({ bus: req.params.busId });

    res.json({
      status: "success",
      data: trips
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = TripUpdateRouter;