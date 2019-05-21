const router = require("express").Router();
const chargeController = require("../../controller");

// Matches with "/api/charge"
console.log("here");
router.route("/").post(chargeController.postCharge);

module.exports = router;
