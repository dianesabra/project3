const router = require("express").Router();
const mealRoutes = require("./mealRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/meals", mealRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
