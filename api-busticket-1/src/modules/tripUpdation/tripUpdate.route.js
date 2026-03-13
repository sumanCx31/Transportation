const TripUpdateRouter = require('express').Router();
const bodyValidator = require('../../middlewares/request-validate.middleware');
const TripCltr = require('./tripUpdate.controller');
const { TripValidateDTO } = require('./tripUpdate.validator');

TripUpdateRouter.post("/",bodyValidator(TripValidateDTO),TripCltr.create);
TripUpdateRouter.put("/:id",bodyValidator(TripValidateDTO),TripCltr.updateById);


module.exports = TripUpdateRouter;