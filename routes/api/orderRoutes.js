const router = require("express").Router();
const orderController = require("../../controller/index");

// Matches with "/api/orders"
router.route("/").post(orderController.postOrders);

router.route("/:id/:qtyFulfilled").get(orderController.getOrderForCart);

router.route("/:id/:qtyFulfilled/:orderID").put(orderController.updateQty);

router
  .route("/:id")
  .delete(orderController.deleteOrders)
  .get(orderController.getOrders);
module.exports = router;
