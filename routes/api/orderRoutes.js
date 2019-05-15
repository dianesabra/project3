const router = require("express").Router();
const orderController = require("../../controller/index");

// Matches with "/api/orders"
router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.postOrders);

router
  .route("/:id/:qtyFulfilled")
  .delete(orderController.deleteOrders)
  .get(orderController.getOrderForCart);

module.exports = router;
