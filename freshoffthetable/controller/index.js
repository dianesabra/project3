const db = require("../models");
module.exports = {
  // food feed
  getMeals(req, res) {
    db.Meals.find(req.body).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  // Cook sees posted meals
  getMealByCook(req, res) {
    db.Meals.find({ _userID: req.body }).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  // anyone can post
  postMeal(req, res) {
    db.Meals.create(req.body).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  // only cook can delete
  deleteMeal(req, res) {
    db.Meals.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(function(dbMeals) {
        res.json(dbMeals);
      });
  },
  // only for the cook
  getOrders(req, res) {
    db.Orders.find(req.body).then(function(dbOrders) {
      res.json(dbOrders);
      // filter by user ID and meal ID
    });
  },
  // anyone can post
  postOrders(req, res) {
    db.Orders.create(req.body).then(function(dbOrders) {
      res.json(dbOrders);
    });
  },
  // only cook
  deleteOrders(req, res) {
    db.Orders.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(function(dbOrders) {
        res.json(dbOrders);
      });
  },
  // anyone can
  postUser(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  }
};
