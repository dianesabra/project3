const router = require("express").Router();
const orderController = require("../../controller/index");

// Matches with "/api/requests"

router.route("/:id").get(orderController.getRequest);
module.exports = router;
