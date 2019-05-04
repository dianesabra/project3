const db = require("../models");
module.exports = {
  getMeals(req, res) {
    db.Meals.find(req.body).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  // getMealByUser(req, res) {
  //   db.Meals.find({ name: "john" }).then(function(dbMeals) {
  //     res.json(dbMeals);
  //   });
  // },
  postMeal(req, res) {
    db.Meals.create(req.body).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  deleteMeal(req, res) {
    db.Meals.deleteOne(req.body).then(function(dbMeals) {
      res.json(dbMeals);
    });
  },
  getOrders(req, res) {
    db.Orders.find(req.body).then(function(dbOrders) {
      res.json(dbOrders);
    });
  },
  postOrders(req, res) {
    db.Orders.create(req.body).then(function(dbOrders) {
      res.json(dbOrders);
    });
  },
  deleteOrders(req, res) {
    db.Orders.deleteOne(req.body).then(function(dbOrders) {
      res.json(dbOrders);
    });
  },
  postUser(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  }
};
