const router = require("express").Router();
const orderController = require("../../controller/index");

// Matches with "/api/orders"
router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.postOrders)
  .delete(orderController.deleteOrders);

module.exports = router;
