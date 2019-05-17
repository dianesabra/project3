const router = require("express").Router();
const orderController = require("../../controller/index");

// Matches with "/api/orders"
router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.postOrders);

router
  .route("/:id/:qtyFulfilled")
  .get(orderController.getOrderForCart)
  .put(orderController.updateQty);

router.route("/:id").delete(orderController.deleteOrders);
module.exports = router;