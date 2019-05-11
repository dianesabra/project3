const router = require("express").Router();
const mealRoutes = require("./mealRoutes");
const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");

router.use("/meals", mealRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

module.exports = router;
