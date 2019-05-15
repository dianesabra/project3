const router = require("express").Router();
const chargeController = require("../../controller");

// Matches with "/api/orders"
router.route("/");
//   .get(chargeController.getOrders)
router.post(chargeController.postCharge);

module.exports = router;
