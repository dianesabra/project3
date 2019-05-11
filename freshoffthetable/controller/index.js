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
  // Cook sees posted meals
  getOrderForCart(req, res) {
    db.Order.find({
      _userID: req.params.id,
      paidOrder: req.params.paidOrder
    }).then(function(dbMeals) {
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
      .then(res => {
        db.Orders.deleteMany({ _mealID: req.params.id });
      })
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

  getUser(req, res) {
    // console.log(req.body);
    db.User.find({ email: req.body.email })
      .then(function(user) {
        console.log(user);
        if (user.length < 1) return res.json({ error: "User does not exist." });
        if (user[0].password !== req.body.password)
          return res.json({ error: "Incorrect password." });
        // anything in the res.json is sent to the .then function in the front-end to resolve the promise
        res.json(user[0]);
        // Would crash if there is no user and there is no method to catch the error
      })
      .catch(err => {
        console.log(err);
      });
  },
  // anyone can
  postUser(req, res) {
    console.log(req.body);
    db.User.find({ email: req.body.email }).then(function(user) {
      if (user) return res.json({ error: "User already exists." });
      db.User.create(req.body)
        .then(function(dbUser) {
          res.json(dbUser);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
