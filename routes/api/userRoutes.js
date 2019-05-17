const router = require("express").Router();
const userController = require("../../controller");

// Matches with "/api/users"
router
  .route("/")
  .get(userController.getOrders)
  .post(userController.postUser)
  .delete(userController.deleteOrders);

router.route("/login").post(userController.getUser);

module.exports = router;
