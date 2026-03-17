const authRouter = require("../modules/auth/auth.router");
const bannerRouter = require("../modules/banner/banner.router");
const busRouter = require("../modules/bus/bus.router");
const bookingRouter = require("../modules/reservation/booking.route");
const searchRouter = require("../modules/searchByRoute/search.route");
const TripUpdateRouter = require("../modules/tripUpdation/tripUpdate.route");

const router = require("express").Router()
router.get("/",(req, res, next) => {
    res.json({
        data: null,
         message: "Health ok",
        status: "Sucess",
        options: null
    })
})

router.use("/auth",authRouter);
router.use("/banners",bannerRouter);
router.use("/bus",busRouter);
router.use("/search",searchRouter)
router.use("/trip-update",TripUpdateRouter);
router.use("/book-ticket",bookingRouter);

module.exports = router;