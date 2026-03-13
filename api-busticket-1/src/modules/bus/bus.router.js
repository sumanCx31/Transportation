const bodyValidator = require('../../middlewares/request-validate.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const BusCltr = require('./bus.controller');
const { BusValidatorDTO } = require('./bus.validator');

const busRouter = require('express').Router();

busRouter.post("/",uploader().single("image"),bodyValidator(BusValidatorDTO),BusCltr.Create);
busRouter.get("/",BusCltr.getAllBus);
busRouter.get("/:id",BusCltr.getBusById);
busRouter.delete("/:id",BusCltr.deleteBusById);

module.exports = busRouter;