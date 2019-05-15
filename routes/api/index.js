const router = require("express").Router();
const mealRoutes = require("./mealRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");
const chargeRoutes = require("./chargeRoutes");

router.use("/meals", mealRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/charge", chargeRoutes);

module.exports = router;
