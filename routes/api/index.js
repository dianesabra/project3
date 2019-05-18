const router = require("express").Router();
const mealRoutes = require("./mealRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const chargeRoutes = require("./chargeRoutes");
const requestRoutes = require("./requestRoutes");

router.use("/meals", mealRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/charge", chargeRoutes);
router.use("/requests", requestRoutes);

module.exports = router;
