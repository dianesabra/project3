const router = require("express").Router();
const userController = require("../../controller");

// Matches with "/api/orders"
router
  .route("/")
  .get(userController.getOrders)
  .post(userController.postUser)
  .delete(userController.deleteOrders);

module.exports = router;
