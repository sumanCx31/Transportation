const bookcltr = require('./booking.controller');

const bookingRouter = require('express').Router();

bookingRouter.post("/",bookcltr.BookTicket)


module.exports = bookingRouter;