const router = require("express").Router();
const mealContoller = require("../../controller/index");
debugger;
//Matches with "api/meals"
router
  .route("/")
  .get(mealContoller.getMeals)
  .post(mealContoller.postMeal);

router
  .route("/:id")
  .delete(mealContoller.deleteMeal)
  .get(mealContoller.getMealByCook);

module.exports = router;
