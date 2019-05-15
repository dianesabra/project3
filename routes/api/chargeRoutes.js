const router = require("express").Router();
const chargeController = require("../../controller");

// Matches with "/api/orders"
router
  .route("/")
  //   .get(chargeController.getOrders)
  .post(chargeController.postCharge);

// router.route("/login").post(chargeController.getUser);

module.exports = router;
