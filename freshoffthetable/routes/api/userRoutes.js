const router = require("router").Router();
const userController = require("../../controller");

// Matches with "/api/orders"
router
  .route("/")
  .get(userController.getOrders)
  .post(userController.postOrders)
  .delete(userController.deleteOrders);

module.exports = router;
